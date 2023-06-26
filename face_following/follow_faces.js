var HI3510 = require('./HI3510');


const tf = require('@tensorflow/tfjs-node'); // eslint-disable-line node/no-unpublished-require
const Human = require('@vladmandic/human'); // use this when human is installed as module (majority of use cases)

const human_config = {
    modelBasePath: 'file://models/',
    debug: false,
    face: { emotion: { enabled: false } },
    body: { enabled: false },
    hand: { enabled: false },
    gesture: { enabled: false },
};

const cam_config = {
    username: "admin",
    password: "admin",
    host: "192.168.137.169"
};

let v_speed = 2000;
let h_speed = 4000;

async function main() {

    let human = new Human.Human(human_config);
    await human.tf.ready();
    console.log('Human:', human.version, 'TF:', tf.version_core);
    await human.load();
    console.log('Loaded:', human.models.loaded());
    console.log('Memory state:', human.tf.engine().memory());

    let cam = new HI3510(cam_config);
    let hv_turn = false;

    while (true) {

        let detection = (await detect(human, "http://" + cam_config.host + "/tmpfs/auto.jpg"))

        console.log(detection.face.length);
        if (detection.face.length == 0) {
            console.log("lost, patrolling");
            if (hv_turn) {
                if (new Date().getTime() % 100000 > 50000) {
                    await cam.ptzMoveRight();
                } else {
                    await cam.ptzMoveLeft();
                }
            } else {
                if (new Date().getTime() % 20000 > 10000) {
                    await cam.ptzMoveUp();
                } else {
                    await cam.ptzMoveDown();

                }
            }
            hv_turn = !hv_turn;

        }
        if (detection.face.length > 0) {

            let face = detection.face[0];
            let face_x = face.boxRaw[0] + face.boxRaw[2] / 2 - 0.5;
            let face_y = face.boxRaw[1] + face.boxRaw[3] / 2 - 0.5;
            console.log(face_x, face_y)
            if (Math.abs(face_x) > Math.abs(face_y)) {
                if (face_x > 0) {
                    await cam.ptzMoveRight();
                    await new Promise((r) => { setTimeout(r, Math.abs(face_x) * h_speed) })

                } else {
                    await cam.ptzMoveLeft();
                    await new Promise((r) => { setTimeout(r, Math.abs(face_x) * h_speed) })
                }
            } else {
                if (face_y > 0) {
                    await cam.ptzMoveDown();
                    await new Promise((r) => { setTimeout(r, Math.abs(face_y) * v_speed) })
                } else {
                    await cam.ptzMoveUp();
                    await new Promise((r) => { setTimeout(r, Math.abs(face_y) * v_speed) })
                }
            }


            await cam.ptzStopRun();

        }
    }
}


async function detect(human, url) {
    // read input image file and create tensor to be used for processing
    let buffer;

    const res = await fetch(url, {
        "credentials": "include",
        "headers": {
            'Authorization': 'Basic ' + Buffer.from(cam_config.username + ":" + cam_config.password).toString('base64')
        }
    })
    if (res && res.ok) {
        buffer = Buffer.from(await res.arrayBuffer());
    }
    else {
        console.error('Invalid image URL:', input, res.status, res.statusText, res.headers.get('content-type'));
    }

    const tensor = human.tf.node.decodeImage(buffer, 3);
    // console.log('Loaded image:', input, tensor.shape);
    const result = await human.detect(tensor, human_config);
    human.tf.dispose(tensor);
    return result;
}

main();
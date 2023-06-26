let set =
    fetch("http://192.168.137.184/web/cgi-bin/hi3510/param.cgi", {
        "credentials": "include",
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "authorization": "Basic YWRtaW46YWRtaW4=",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "upgrade-insecure-requests": "1"
        },
        "referrer": "http://192.168.137.184/web/display.html",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": ["cmd=setinfrared",
            "-infraredstat=close", // open close auto
            "cmd=setircutattr",
            "-saradc_switch_value=500",
            "cmd=setimageattr",
            "-brightness=64",
            "-contrast=48", // 0..100
            "-saturation=128", // 0..255
            "-sharpness=64", // 0..100
            "-mirror=off", // on off
            "-flip=off", // on off
            "-shutter=0", // ? 0..65535
            "-night=off", // on off 
            "-wdr=on", // ?
            "-noise=0", // 1
            "-gc=30", // ?
            "-ae=2", // ?
            "-targety=255", // ? 0..255
            "-gamma=0", // ? 0..3
            "-aemode=1",
            "-image_type=1",
            "-imgmode=1",
            "cmd=setldcattr",
            "-ldc_ratio=0" // ?
        ].join("&"),
        "method": "POST",
        "mode": "cors"
    });


set.then(e => { console.log(e); e.text().then(console.log) });


// let get = await fetch("http://192.168.137.184/web/cgi-bin/hi3510/param.cgi?cmd=getimageattr&cmd=getsetupflag&cmd=getimagemaxsize&cmd=getaudioflag&cmd=getserverinfo&cmd=getvideoattr&cmd=getircutattr&cmd=getldcattr&cmd=getinfrared&cmd=getrtmpattr", {
//     "credentials": "include",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
//         "Accept": "*/*",
//         "Accept-Language": "en-GB,en;q=0.5",
//         "Authorization": "Basic YWRtaW46YWRtaW4=",
//         "Pragma": "no-cache",
//         "Cache-Control": "no-cache"
//     },
//     "referrer": "http://192.168.137.184/web/display.html",
//     "method": "GET",
//     "mode": "cors"
// });

// get.then(e => { console.log(e); e.text().then(console.log) });



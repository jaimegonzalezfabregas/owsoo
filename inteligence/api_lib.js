const IP = "192.168.137.184"
const PARAM_CGI = "http://" + IP + "/web/cgi-bin/hi3510/param.cgi"
const USERNAME = "admin";
const PASSWORD = "admin";
const HEADERS = {
    'Authorization': 'Basic ' + Buffer.from(USERNAME + ":" + PASSWORD).toString('base64')
}

console.log(HEADERS)

function set_ir(state) {

    let set =
        fetch(PARAM_CGI, {
            "credentials": "include",
            "headers": HEADERS,
            "body": ["cmd=setinfrared",
                "-infraredstat=" + ["close","open"][state],
            ].join("&"),
            "method": "POST",
        });


    set.then(e => { console.log(e); e.text().then(console.log) });

}

function set_ir_auto(threshold) {

    let set =
        fetch(PARAM_CGI, {
            "credentials": "include",
            "headers": HEADERS,
            "body": ["cmd=setinfrared",
                "-infraredstat=auto", 
                "cmd=setircutattr",
                "-saradc_switch_value=" + threshold,
            ].join("&"),
            "method": "POST",
        });


    set.then(e => { console.log(e); e.text().then(console.log) });

}

set_ir_auto(1024)


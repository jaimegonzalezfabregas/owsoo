let HI3510 = require("./hi3510-client-master");

let cam = HI3510({
    username:"admin",
    password:"admin",
    host:"192.168.137.55"
})

cam.ptzStepUp();
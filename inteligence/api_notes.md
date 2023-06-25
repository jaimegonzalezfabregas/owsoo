# movement

http://admin:admin@192.168.137.184/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=stop

http://admin:admin@192.168.137.184/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=up
http://admin:admin@192.168.137.184/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=down
http://admin:admin@192.168.137.184/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=right
http://admin:admin@192.168.137.184/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=left
 

http://192.168.137.184/web/cgi-bin/hi3510/param.cgi?cmd=preset&-act=goto&-number=2
http://192.168.137.184/web/cgi-bin/hi3510/param.cgi?cmd=preset&-act=set&-status=1&-number=2
// status 0 hace que no se guarde creo, solo funcionan status 0 y 1

http://192.168.137.184/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=home

http://192.168.137.184/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=hscan
http://192.168.137.184/web/cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=vscan

# config

http://192.168.137.184/web/cgi-bin/hi3510/param.cgi?cmd=setimageattr&-image_type=1&-brightness=78
http://192.168.137.184/web/cgi-bin/hi3510/param.cgi?cmd=setimageattr&-image_type=1&-saturation=153
http://192.168.137.184/web/cgi-bin/hi3510/param.cgi?cmd=setimageattr&-image_type=1&-contrast=65

```js
fetch("http://192.168.137.184/web/cgi-bin/hi3510/param.cgi", {
    "credentials":"include",
    "headers":{
        "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
        "accept-language":"en-GB,en-US;q=0.9,en;q=0.8",
        "authorization":"Basic YWRtaW46YWRtaW4=",
        "cache-control":"max-age=0",
        "content-type":"application/x-www-form-urlencoded",
        "upgrade-insecure-requests":"1"
    },
    "referrer":"http://192.168.137.184/web/display.html",
    "referrerPolicy":"no-referrer-when-downgrade",
    "body":"cmd=setinfrared&cururl=http%3A%2F%2F192.168.137.184%2Fweb%2Fdisplay.html&-infraredstat=auto&cmd=setircutattr&-saradc_switch_value=501&cmd=setimageattr&-brightness=67&-contrast=100&-saturation=153&-sharpness=100&-mirror=off&-flip=on&-shutter=65535&-night=off&-wdr=off&-noise=0&-gc=30&-ae=2&-targety=80&-gamma=1&-aemode=0&-image_type=1&-imgmode=0&cmd=setldcattr&-ldc_ratio=0",
    "method":"POST",
    "mode":"cors"
});

```

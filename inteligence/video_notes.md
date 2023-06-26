# uid
-- lo pone por debajo de la camara
III-172475-EDBCB
3-III-172475-EDBCB

# fastrtsp command con stsp
ffplay.exe -fflags nobuffer -flags low_delay rtsp://192.168.137.184:554/11
ffplay.exe -probesize 32 -sync ext rtsp://192.168.137.184:554/11
ffplay.exe -probesize 32 -sync ext -fflags nobuffer -flags low_delay rtsp://192.168.137.184:554/11

## comparison tester
ffplay.exe -x 482 -y 281 -probesize 32 -sync ext rtsp://192.168.137.184:554/11

ffplay.exe -x 482 -y 281 -probesize 32 -sync ext -fflags nobuffer -flags low_delay rtsp://192.168.137.184:554/11


**FASTEST**
ffplay.exe -x 482 -y 281 -fflags nobuffer -flags low_delay -framedrop rtsp://192.168.137.43:554/11


# streams por rtmp

var rturl = "rtmp://" + ip + ":" + rtmpport + "/flash/" + streamnum + ":" + name0 + ":" + password0;

-- sacado del src del player de flash y experimentacion con vlc

rtmp://192.168.137.103:1935/flash/1:admin:admin
rtmp://192.168.137.103:1935/flash/2:admin:admin

rtmp://192.168.137.103:1935/flash/11:admin:admin
rtmp://192.168.137.103:1935/flash/12:admin:admin

rtmp://192.168.137.103:1935/flash/21:admin:admin
rtmp://192.168.137.103:1935/flash/22:admin:admin

... for x in 3..=8

rtmp://192.168.137.103:1935/flash/x1:admin:admin
rtmp://192.168.137.103:1935/flash/x2:admin:admin

...

rtmp://192.168.137.103:1935/flash/91:admin:admin
rtmp://192.168.137.103:1935/flash/92:admin:admin


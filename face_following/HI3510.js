'use strict';

var rp = require('request-promise');
var Q = require('q');

class HI3510 {
    constructor(config) {
        if (!config) {
            throw new Error('no config was supplied');
        }

        this.username = config.username;
        this.password = config.password;
        this.address = config.host;
        this.port = config.port || 80;
        this.protocol = config.protocol || 'http';
        this.cgiPath = config.cgiPath || '/web/cgi-bin/hi3510/';
        this.ptz = 'ptzctrl.cgi';
        this.admin = 'param.cgi';
        this.rootUrl = (
            this.protocol + '://' +
            this.username + ':' + this.password + '@' +
            this.address + ':' + this.port
        );
        this.url = this.rootUrl + this.cgiPath;
        this.config = null;
    }
    static parseInfo(str, fields) {
        var obStr = [];
        fields.forEach(function (field) {
            obStr.push(`${field}:${field}`);
        });
        return Function(`"use strict";${str}return {${obStr.join(',')}};`)();
    }
    get(cgi, params, options) {
        var self = this;
        return this.getRaw(cgi, params, options)
            .then(function (response) {
                return self.parseResponse(response);
            });
    }
    getRaw(cgi, params, options) {
        params = params ? params : {};

        options = options || {};
        options.qs = params;

        return rp.get(this.url + cgi, options);
    }
    post(cgi, params, options) {
        var self = this;
        return this.postRaw(cgi, params, options)
            .then(function (response) {
                return self.parseResponse(response);
            });
    }
    postRaw(cgi, params, options) {
        params = params ? params : {};

        options = options || {};
        options.qs = params;

        return rp.post(this.url + cgi, options);
    }
    notImplemented() {
        throw new Error('That method has not been implemented yet');
    }
    parseResponse(response) {
        var deferred = Q.defer();
        if (response) {
            deferred.resolve(response);
        } else {
            deferred.reject(response);
        }

        return deferred.promise;
    }
    setSystemTime() {
        this.notImplemented();
    }
    getInfraState() {
        return this.get(this.admin, { cmd: 'getinfrared' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, ['infraredstat']);
            }
        );
    }
    openInfraLed() {
        return this.get(this.ptz, { '-act': 'setinfrared', '-infraredstat': 'open' });
    }
    closeInfraLed() {
        return this.get(this.ptz, { '-act': 'setinfrared', '-infraredstat': 'close' });
    }
    getMaxImageSize() {
        return this.get(this.admin, { cmd: 'getimagemaxsize' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, ['imagesize']);
            }
        );
    }
    getServerInfo() {
        return this.get(this.admin, { cmd: 'getserverinfo' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'model',
                    'hardVersion',
                    'softVersion',
                    'webVersion',
                    'name',
                    'startdate',
                    'upnpstatus',
                    'facddnsstatus',
                    'th3ddnsstatus',
                    'platformstatus',
                    'sdstatus',
                    'sdfreespace',
                    'sdtotalspace',
                ]);
            }
        );
    }
    getNetworkConfig() {

        return this.get(this.admin, { cmd: 'getnetattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'dhcpflag',
                    'ip',
                    'netmask',
                    'gateway',
                    'dnsstat',
                    'fdnsip',
                    'sdnsip',
                    'macaddress',
                    'networktype',
                ]);
            }
        );
    }
    getWifiConfig() {

        return this.get(this.admin, { cmd: 'getwirelessattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'wf_enable',
                    'wf_ssid',
                    'wf_auth',
                    'wf_key',
                    'wf_enc',
                    'wf_mode',
                ]);
            }
        );
    }
    getStreamNum() {

        return this.get(this.admin, { cmd: 'getstreamnum' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, ['stream_num']);
            }
        );
    }
    getDynDNSConfig() {

        return this.get(this.admin, { cmd: 'getourddnsattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'our_enable',
                    'our_server',
                    'our_port',
                    'our_uname',
                    'our_passwd',
                    'our_domain',
                    'our_interval',
                ]);
            }
        );
    }
    getOtherDynDNSConfig() {

        return this.get(this.admin, { cmd: 'get3thddnsattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'd3th_enable',
                    'd3th_service',
                    'd3th_uname',
                    'd3th_passwd',
                    'd3th_domain',
                ]);
            }
        );
    }
    getUPnPConfig() {

        return this.get(this.admin, { cmd: 'getupnpattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, ['upm_enable']);
            }
        );
    }
    getOnvifConfig() {

        return this.get(this.admin, { cmd: 'getonvifattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'ov_enable',
                    'ov_port',
                    'ov_authflag',
                    'ov_forbitset',
                    'ov_subchn',
                    'ov_snapchn',
                ]);
            }
        );
    }
    getUserConfig() {

        return this.get(this.admin, { cmd: 'getuserattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'at_username0',
                    'at_password0',
                    'at_authlevel0',
                    'at_username1',
                    'at_password1',
                    'at_authlevel1',
                    'at_username2',
                    'at_password2',
                    'at_authlevel2',
                ]);
            }
        );
    }
    getSnapTimerConfig() {

        return this.get(this.admin, { cmd: 'getsnaptimerattrex', '-ename': 'snap' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'as_snap_enable',
                    'as_snap_interval',
                    'as_email_enable',
                    'as_email_interval',
                    'as_ftp_enable',
                    'as_ftp_interval',
                    'as_cloud_enable',
                    'as_cloud_interval',
                ]);
            }
        );
    }
    getSnapTimerScheduleConfig() {

        return this.get(this.admin, { cmd: 'getscheduleex', '-ename': 'snap' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'etm',
                    'week0',
                    'week1',
                    'week2',
                    'week3',
                    'week4',
                    'week5',
                    'week6',
                ]);
            }
        );
    }
    getVideoTimerConfig() {

        return this.get(this.admin, { cmd: 'getplanrecattr', '-ename': 'plan' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'planrec_enable',
                    'planrec_chn',
                    'planrec_time',
                    'planrec_type',
                ]);
            }
        );
    }
    getVideoTimerScheduleConfig() {

        return this.get(this.admin, { cmd: 'getscheduleex', '-ename': 'plan' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'etm',
                    'week0',
                    'week1',
                    'week2',
                    'week3',
                    'week4',
                    'week5',
                    'week6',
                ]);
            }
        );
    }
    getEmailConfig() {

        return this.get(this.admin, { cmd: 'getsmtpattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'ma_server',
                    'ma_port',
                    'ma_ssl',
                    'ma_logintype',
                    'ma_username',
                    'ma_password',
                    'ma_from',
                    'ma_to',
                    'ma_subject',
                    'ma_text',
                ]);
            }
        );
    }
    getFTPConfig() {

        return this.get(this.admin, { cmd: 'getftpattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'ft_server',
                    'ft_port',
                    'ft_username',
                    'ft_password',
                    'ft_mode',
                    'ft_dirname',
                    'ft_autocreatedir',
                ]);
            }
        );
    }
    getAlarmConfig() {

        return this.get(this.admin, { cmd: 'getalarmserverattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'as_server',
                    'as_port',
                    'as_username',
                    'as_password',
                ]);
            }
        );
    }
    getPTZConfig() {

        return this.get(this.admin, { cmd: 'getmotorattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'panspeed',
                    'tiltspeed',
                    'panscan',
                    'tiltscan',
                    'movehome',
                    'ptzalarmmask',
                    'alarmpresetindex',
                ]);
            }
        );
    }
    getExternalAlarmConfig() {

        return this.get(this.admin, { cmd: 'getioattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'io_enable',
                    'io_flag',
                ]);
            }
        );
    }
    getAlarmAudioConfig() {

        return this.get(this.admin, { cmd: 'getaudioalarmattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'aa_enable',
                    'aa_value',
                ]);
            }
        );
    }
    getLinkageAlarmConfig() {

        return this.get(this.admin, {
            '-aname': [
                'email',
                'emailsnap',
                'ftpsnap',
                'snap',
                'emailrec',
                'record',
                'ftprec',
                'relay',
                'server',
            ],
            cmd: [
                'getmdalarm',
                'getmdalarm',
                'getmdalarm',
                'getmdalarm',
                'getmdalarm',
                'getmdalarm',
                'getmdalarm',
                'getmdalarm',
                'getmdalarm',
            ],
        }, { qsStringifyOptions: { indices: false } }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'md_email_switch',
                    'md_emailsnap_switch',
                    'md_ftpsnap_switch',
                    'md_snap_switch',
                    'md_emailrec_switch',
                    'md_record_switch',
                    'md_ftprec_switch',
                    'md_relay_switch',
                    'md_server_switch',
                ]);
            }
        );
    }
    getConfig() {

        return this.get(this.admin, { cmd: 'getscheduleex', '-ename': 'snap' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'etm',
                    'week0',
                    'week1',
                    'week2',
                    'week3',
                    'week4',
                    'week5',
                    'week6',
                ]);
            }
        );
    }
    getDevType() {

        return this.get(this.admin, { cmd: 'getdevtype' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, ['devtype']);
            }
        );
    }
    getLightEnable() {

        return this.get(this.admin, { cmd: 'getlightattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, ['light_enable']);
            }
        );
    }
    getAudioConfig() {

        return this.get(this.admin, {
            '-chn': [
                '011',
                '012',
                '013',
            ],
            cmd: [
                'getaencattr',
                'getaencattr',
                'getaencattr',
                'getaudioinvolume',
                'getaudiooutvolume',
            ],
        }, { qsStringifyOptions: { indices: false } }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'aeswitch_1',
                    'aeformat_1',
                    'aeswitch_2',
                    'aeformat_2',
                    'aeswitch_3',
                    'aeformat_3',
                    'volin_type',
                    'volume',
                    'aec',
                    'denoise',
                    'ao_volume',
                ]);
            }
        );
    }
    getAudioFlag() {

        return this.get(this.admin, { cmd: 'getaudioflag' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, ['audioflag']);
            }
        );
    }
    getImageConfig() {

        return this.get(this.admin, { cmd: 'getimageattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'display_mode',
                    'brightness',
                    'saturation',
                    'sharpness',
                    'contrast',
                    'hue',
                    'wdr',
                    'night',
                    'shutter',
                    'flip',
                    'mirror',
                    'gc',
                    'ae',
                    'targety',
                    'noise',
                    'gamma',
                    'aemode',
                    'imgmode',
                ]);
            }
        );
    }
    getIRCutConfig() {

        return this.get(this.admin, { cmd: 'getircutattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'saradc_switch_value',
                    'saradc_b2c_switch_value',
                ]);
            }
        );
    }
    getVideoConfig() {

        return this.get(this.admin, { cmd: 'getvideoattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'videomode',
                    'vinorm',
                    'profile',
                    'maxchn',
                ]);
            }
        );
    }
    getMotionDetectConfig() {

        return this.get(this.admin, { cmd: 'getmdattr' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'm1_enable',
                    'm1_x',
                    'm1_y',
                    'm1_w',
                    'm1_h',
                    'm1_sensitivity',
                    'm1_threshold',
                    'm2_enable',
                    'm2_x',
                    'm2_y',
                    'm2_w',
                    'm2_h',
                    'm2_sensitivity',
                    'm2_threshold',
                    'm3_enable',
                    'm3_x',
                    'm3_y',
                    'm3_w',
                    'm3_h',
                    'm3_sensitivity',
                    'm3_threshold',
                    'm4_enable',
                    'm4_x',
                    'm4_y',
                    'm4_w',
                    'm4_h',
                    'm4_sensitivity',
                    'm4_threshold',
                ]);
            }
        );
    }
    getMotionDetectScheduleConfig() {

        return this.get(this.admin, { cmd: 'getscheduleex', '-ename': 'md' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'etm',
                    'week0',
                    'week1',
                    'week2',
                    'week3',
                    'week4',
                    'week5',
                    'week6',
                ]);
            }
        );
    }
    getSetupFlag() {

        return this.get(this.admin, { cmd: 'getsetupflag' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'name0',
                    'password0',
                    'authLevel0',
                ]);
            }
        );
    }
    getServerTime() {

        return this.get(this.admin, { cmd: 'getservertime' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, [
                    'time',
                    'timeZone',
                    'dstmode',
                ]);
            }
        );
    }
    getHTTPPort() {

        return this.get(this.admin, { cmd: 'gethttpport' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, ['httpport']);
            }
        );
    }
    getRTSPPort() {

        return this.get(this.admin, { cmd: 'getrtspport' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, ['rtspport', 'rtpport']);
            }
        );
    }
    getRTSPAuth() {

        return this.get(this.admin, { cmd: 'getrtspauth' }).then(
            function (resp) {
                return HI3510.parseInfo(resp, ['rtsp_aenable']);
            }
        );
    }
    ptzMoveUp() {
        return this.get(this.ptz, { '-step': 0, '-act': 'up' });
    }
    ptzMoveDown() {
        return this.get(this.ptz, { '-step': 0, '-act': 'down' });
    }
    ptzMoveLeft() {
        return this.get(this.ptz, { '-step': 0, '-act': 'left' });
    }
    ptzMoveRight() {
        return this.get(this.ptz, { '-step': 0, '-act': 'right' });
    }
    ptzVerticalScan() {
        return this.get(this.ptz, { '-step': 0, '-act': 'vscan' });
    }
    ptzHorizontalScan() {
        return this.get(this.ptz, { '-step': 0, '-act': 'hscan' });
    }
    ptzHome() {
        return this.get(this.ptz, { '-step': 0, '-act': 'home' });
    }
    ptzStopRun() {
        return this.get(this.ptz, { '-act': 'stop' });
    }
    ptzStepUp() {
        var self = this;
        return this.ptzMoveUp().then(function () { return self.ptzStopRun(); });
    }
    ptzStepDown() {
        var self = this;
        return this.ptzMoveDown().then(function () { return self.ptzStopRun(); });
    }
    ptzStepLeft() {
        var self = this;
        return this.ptzMoveLeft().then(function () { return self.ptzStopRun(); });
    }
    ptzStepRight() {
        var self = this;
        return this.ptzMoveRight().then(function () { return self.ptzStopRun(); });
    }
    ptzGotoPresetPoint(pt) {
        return this.get(this.ptz, { '-act': 'goto', '-number': pt });
    }
    ptzSavePresetPoint(pt) {
        return this.get(this.ptz, { '-act': 'set', '-status': 1, '-number': pt });
    }
}



module.exports = HI3510;



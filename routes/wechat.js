var exec = require('child_process').exec;
var wechat = require('wechat');

var config = {
	token: 'superpi',
	appid: 'wx1833a56d86b539c6',
	encodingAESKey: 'B1dOEIDmw50nsE3rtnClD1BuaThITnX5VLeW96wsXrQ'
};

module.exports = wechat(config, function (req, res, next) {
	var message = req.weixin;

    res.send(req.query.echostr);
    return;

	if (message.MsgType != 'text') {
		res.reply('Only Text Message Accepted.');
	} else {
		execCommand(message.Content, res);
	}
});

function execCommand(command, res){
	exec(command, function(err, stdout, stderr){
		if(err) {
			console.log('get weather api error:'+stderr);
			res.reply(stderr);
			return;
		}
		res.reply(stdout);
	});
}
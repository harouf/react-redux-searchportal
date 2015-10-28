import config from '../config';

let dbServerUrl = (dbConfig) => {
	return 'http' + (dbConfig.ssl ? 's' : '') + '://' + (dbConfig.credentials ? (dbConfig.credentials.username + '@' + dbConfig.credentials.password + ':') : '') + dbConfig.host + ':' + dbConfig.port;
};

export default function login(req, res) {

	var {AuthSession} = req.cookies
		, serverUrl = dbServerUrl(config.couchDB)
		, dbConfig = AuthSession ? { url: serverUrl, cookie:  'AuthSession=' + AuthSession } : serverUrl
		, nano = require('nano')( dbConfig )
  		, username = req.body.name
  		, userpass = req.body.password
  		, callback = console.log
		, cookies  = {} // store cookies, normally redis or something
	  	;
  	if ( AuthSession ) {
  		return new Promise(
  			(resolve, reject) => {
  				nano.session(function(err, session) {
			  		if (err) {
					    reject('session expired.');
				  	}else{
				  		resolve({ name: session.userCtx.name });
				  	}
				});
  			}
		);
  	}else{
		return new Promise(
			(resolve, reject) => {
				nano.auth(username, userpass, function (err, body, headers) {
				  	if (err) {
				    	callback(err);
				    	reject(err.reason);
				  	}else{

					  	if (headers && headers['set-cookie']) {
					    	var cookie_val = headers['set-cookie'][0].split(';')[0];
					    	res.cookie('AuthSession', cookie_val.substr(cookie_val.indexOf('=') + 1));
					  	}
						const user = {
				    		name: body.name
				  		};
						//req.session.user = user;
						callback(user);
						resolve(user);
					}
				});
			}
		);
  	}
}

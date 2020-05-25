const EventEmitter = require('events');
const request = require('request-promise');

module.exports = {
	Client: class Client extends EventEmitter {
		constructor({ refresh_token, id, secret, user_agent }) {
			super();
			this.refresh_token = refresh_token;
			this.id = id;
			this.secret = secret;
			this.user_agent = user_agent || `Reddit.JS-API/0.0.1 (Client-ID: ${this.id})`;
			this.token = null;
		}
		authenticate() {
			this.authpromise = new Promise((resolve, reject) => {
				let options = {
					method: 'POST',
					url: 'https://www.reddit.com/api/v1/access_token',
					headers: {
						'Authorization': 'Basic ' + Buffer.from(`${this.id}:${this.secret}`).toString('base64'),
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					form: {
						'grant_type': 'refresh_token',
						'refresh_token': this.refresh_token
					}
				};
				request(options)
					.then(body => {
						this.token = JSON.parse(body).access_token;
						resolve()
						super.emit('authorized')
					});
				setInterval(() => { request(options).then(body => { this.token = JSON.parse(body).access_token; }); }, 3590000);
			})
			return this.authpromise
		}
		get(link, opt) {
			return new Promise((resolve, reject) => {
				opt.api_type = 'json'
				Promise.all([this.authpromise]).then(() => {
					let options = {
						method: 'GET',
						url: `https://oauth.reddit.com${link}`,
						headers: {
							'Authorization': `Bearer ${this.token}`,
							'Content-Type': 'application/json',
							'User-Agent': this.user_agent
						},
						form: opt
					};
					request(options)
						.then(body => {
							resolve(JSON.parse(body))
						})
						.catch(reject)
				})
			})
		}
		put(link, opt) {
			return new Promise((resolve, reject) => {
				opt.api_type = 'json'
				Promise.all([this.authpromise]).then(() => {
					let options = {
						method: 'PUT',
						url: `https://oauth.reddit.com${link}`,
						headers: {
							'Authorization': `Bearer ${this.token}`,
							'Content-Type': 'application/json',
							'User-Agent': this.user_agent
						},
						form: opt
					};
					request(options)
						.then(body => {
							resolve(JSON.parse(body))
						})
						.catch(reject)
				})
			})
		}
		
		post(link, opt) {
			return new Promise((resolve, reject) => {
				opt.api_type = 'json'
				Promise.all([this.authpromise]).then(() => {
					let options = {
						method: 'POST',
						url: `https://oauth.reddit.com${link}`,
						headers: {
							'Authorization': `Bearer ${this.token}`,
							'Content-Type': 'application/json',
							'User-Agent': this.user_agent
						},
						form: opt
					};
					request(options)
						.then(body => {
							resolve(JSON.parse(body))
						})
						.catch(reject)
				})
			})
		}
		patch(link, opt) {
			return new Promise((resolve, reject) => {
				opt.api_type = 'json'
				Promise.all([this.authpromise]).then(() => {
					let options = {
						method: 'PATCH',
						url: `https://oauth.reddit.com${link}`,
						headers: {
							'Authorization': `Bearer ${this.token}`,
							'Content-Type': 'application/json',
							'User-Agent': this.user_agent
						},
						form: opt
					};
					request(options)
						.then(body => {
							resolve(JSON.parse(body))
						})
						.catch(reject)
				})
			})
		}
		delete(link, opt) {
			return new Promise((resolve, reject) => {
				opt.api_type = 'json'
				Promise.all([this.authpromise]).then(() => {
					let options = {
						method: 'DELETE',
						url: `https://oauth.reddit.com${link}`,
						headers: {
							'Authorization': `Bearer ${this.token}`,
							'Content-Type': 'application/json',
							'User-Agent': this.user_agent
						},
						form: opt
					};
					request(options)
						.then(body => {
							resolve(JSON.parse(body))
						})
						.catch(reject)
				})
			})
		}
	}
}
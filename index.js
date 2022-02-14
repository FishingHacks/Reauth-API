const axios = require('axios').default;
const chalk = require('chalk');

module.exports = class {
	constructor(id, token) {
		this.token = token;
		this.id = id;
	}

	setID(id) {
		this.id = id;
		return this;
	}

	setToken(token) {
		this.token = token;
		return this;
	}

	async getUser(secret) {
		if (!this.id || !this.token) throw new Error(`[RE-AUTH-API]: ID or Token missing!`);
		let returnValue;
		await axios
			.post('https://auth.redcrafter07.de/api/getToken', {
				headers: {
					Authorization: this.token,
					ID: this.id,
					token: secret
				}
			})
			.then(res => (returnValue = res.data))
			.catch(e => {
				console.log(
					chalk.red(
						`[RE-AUTH-API]: API Error: ${e.response.status} | ${e.response.statusText} | ${e.response.data}`
					)
				);
				throw new Error(
					`[RE-AUTH-API]: API Error: ${e.response.status} | ${e.response.statusText} | ${e.response.data}`
				);
			});

		return returnValue;
	}

	async getInfos(id) {
		let returnValue;
		await axios
			.get('https://auth.redcrafter07.de/api/getInfos', {
				headers: {
					id: id
				}
			})
			.then(res => (returnValue = res.data))
			.catch(e => {
				console.log(require('util').inspect(e));
				console.error(
					`[RE-AUTH-API]: API Error: ${e.response.status} | ${e.response.statusText} | ${e.response.data}`
				);
				throw new Error(
					`[RE-AUTH-API]: API Error: ${e.response.status} | ${e.response.statusText} | ${e.response.data}`
				);
			});

		return returnValue;
	}
};

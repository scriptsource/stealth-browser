
import { log     } from './console.mjs';
import { Request } from './Request.mjs';
import { WS      } from './protocol/WS.mjs';



let _id = 1;

const Session = function(data) {

	let settings = Object.assign({}, data);


	this.id       = '' + _id++;
	this.browser  = settings.browser || 'Unknown';
	this.system   = settings.system  || 'Unknown';
	this.mode     = settings.mode    || 'offline';
	this.socket   = settings.socket  || null;
	this.tabs     = {};

};


Session.prototype = {

	get: function(url) {

		url = typeof url === 'string' ? url : null;


		if (url !== null) {

			let found = null;

			for (let id in this.tabs) {

				let requests = this.tabs[id];

				for (let r = 0, rl = requests.length; r < rl; r++) {

					let request = requests[r];
					if (request.url === url) {
						found = request;
						break;
					}

				}

				if (found !== null) {
					break;
				}

			}

			return found;

		}


		return null;

	},

	init: function() {

		let socket = this.socket || null;
		if (socket !== null) {

			WS.send(socket, {
				headers: {
					session: this.id
				},
				payload: null
			});

			log('session #' + this.id + ' connected.');

		}

	},

	track: function(request, tab) {

		request = request instanceof Request ? request : null;
		tab     = typeof tab === 'string'    ? tab     : 'default';


		if (request !== null && tab !== null) {

			let cache = this.tabs[tab] || null;
			if (cache === null) {
				cache = this.tabs[tab] = [];
			}

			if (cache.includes(request) === false) {

				request.on('error', () => {

					let index = cache.indexOf(request);
					if (index !== -1) {
						cache.splice(index, 1);
					}

				});

				request.on('ready', () => {

					let index = cache.indexOf(request);
					if (index !== -1) {
						cache.splice(index, 1);
					}

				});

				log('session #' + this.id + ' tab #' + tab + ' requests ' + request.url);

				cache.push(request);

			}

		}

	},

	kill: function() {

		// TODO: Stop requests or let them continue?

		if (this.socket !== null) {

			this.socket.end();
			this.socket = null;


			for (let tab in this.tabs) {

				this.tabs[tab].forEach(request => {
					log('session #' + this.id + ' tab #' + tab + ' remains ' + request.url);
				});

			}

			log('session #' + this.id + ' disconnected.');

		}

	}

};


export { Session };


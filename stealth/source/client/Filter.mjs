
import { Emitter } from '../Emitter.mjs';



const Filter = function(client) {

	this.client = client;
	Emitter.call(this);

};


Filter.prototype = Object.assign({}, Emitter.prototype, {

	query: function(payload, callback) {

		payload  = Object.isObject(payload)      ? payload  : null;
		callback = Function.isFunction(callback) ? callback : null;


		if (payload !== null && callback !== null) {

			this.once('query', response => callback(response));

			this.client.send({
				headers: {
					service: 'filter',
					method:  'query'
				},
				payload: payload
			});

		} else if (callback !== null) {
			callback(null);
		}

	},

	remove: function(payload, callback) {

		payload  = Object.isObject(payload)      ? payload  : null;
		callback = Function.isFunction(callback) ? callback : null;


		if (payload !== null && callback !== null) {

			this.once('remove', result => callback(result));

			this.client.send({
				headers: {
					service: 'filter',
					method:  'remove'
				},
				payload: payload
			});

		} else if (callback !== null) {
			callback(false);
		}

	},

	save: function(payloads, callback) {

		payloads = Array.isArray(payloads)       ? payloads : [];
		callback = Function.isFunction(callback) ? callback : null;


		if (payloads.length > 0 && callback !== null) {

			this.once('save', result => callback(result));

			this.client.send({
				headers: {
					service: 'filter',
					method:  'save'
				},
				payload: payloads
			});

		} else if (callback !== null) {
			callback(false);
		}

	}

});


export { Filter };




import { BROWSER, REFERENCE, init, listen, render } from './internal.mjs';



const elements = {
	wizard:  document.querySelector('#fix-mode'),
	modes:   document.querySelector('#fix-mode table tbody'),
	footer:  document.querySelector('footer'),
	refresh: document.querySelector('footer #footer-refresh')
};

const _on_update = function(settings, mode) {
	elements.modes.innerHTML = render('mode', mode, [ 'save' ]);
};



init([
	elements.wizard,
	elements.modes,
	elements.footer,
	elements.refresh
], (browser, result) => {

	if (result === true) {

		listen(elements.modes, (action, data, done) => {

			let service = browser.client.services.mode || null;
			if (service !== null) {

				if (action === 'save') {
					done(browser.set(data) === true);
				} else {
					done(false);
				}

			} else {
				done(false);
			}

		});


		elements.refresh.onclick = () => browser.refresh();
		elements.footer.className = 'active';


		browser.on('change', (tab) => {

			Object.keys(tab.config.mode).forEach((mode) => {

				let button = elements.modes.querySelector('button[data-key="mode.' + mode + '"]');
				if (button !== null) {
					button.setAttribute('data-val', '' + tab.config.mode[mode]);
				}

			});

		});


		if (REFERENCE.domain !== null) {

			browser.client.services.mode.read({
				domain:    REFERENCE.domain,
				subdomain: REFERENCE.subdomain,
				host:      REFERENCE.host
			}, (mode) => {

				if (mode === null) {

					mode = browser.tab.config;

					if (REFERENCE.subdomain !== null) {
						mode.domain = REFERENCE.subdomain + '.' + REFERENCE.domain;
					} else {
						mode.domain = REFERENCE.domain;
					}

				}

				_on_update(browser.settings, mode);

			});

		}

	} else {

		let element = elements.wizard || null;
		if (element !== null) {
			element.parentNode.removeChild(element);
		}

	}

});


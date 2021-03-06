
# Stealth Browser

The Stealth Browser is a different kind of Web Browser that aims to achieve increased privacy,
increased automation through macro-like tasks and efficient bandwidth usage, no matter the cost.

It is built by a former contributor to both Chromium and Firefox, and is built out of personal
opinion on how Web Browsers should try to understand the Semantic Web in regards on letting the
user decide what they want to see - and not irresponsible web developers.


## Downloads / Releases

Currently the Stealth Browser is just a couple days old and is in a prototypical stage. If you
are a Software Developer and want to help, you are welcome to join the project.

Non-Development Users won't enjoy it much, currently - as things are quite buggy and not ready
for the public yet. However, due to the concept of using node.js and focussing on a privacy-oriented
audience, the Stealth Browser will initially be released for `MacOS` and `GNU/Linux`.

(Download Links will be inserted here once the Stealth Browser is ready for the public)


## Screenshots

![stealth:welcome](./guide/screenshots/stealth:welcome.png)
![stealth:settings](./guide/screenshots/stealth:settings.png)
![stealth:fix-site](./guide/screenshots/stealth:fix-site.png)

## Pitch me - What's this?

The Stealth Browser is both a `Browser` and `Stealth`, which is a Web Scraper/Proxy
that can serve its own User Interface that is implemented in HTML5 and CSS3.

- It is secure by default, without compromise. It only supports `DNS via HTTPS`,
  and uses explicitely `https://` first, and fallsback to `http://` only when
  necessary and only when the website was not MITM-ed.

- It offers intelligent wizards on errors that help fix it. A DNS host cache
  wizard, a web archive download assistant, or a web site mode configuration
  assistant will help the user to automate everything based on rules, not based
  on situations.

- It is peer-to-peer and always uses the most efficient way to share resources
  and to reduce bandwidth.

- It uses blacklist-based `Blockers` that is on feature-parity with AdBlock Plus,
  AdGuard, Pi-Hole, uBlock Origin and uMatrix (in the sense of "all of the above,
  because we can").

- It uses so-called optimizers to render only the good parts of HTML and CSS. These
  optimizers make sure that no client or peer ever receives any malicious or unwanted
  content, and it is written on-disk-cache (which is shared later to other peers) to
  ensure that particularly. All optimizers are applied across all modes, and the
  modes decide what content or media is included.

- It uses whitelist-based `Site Modes` that decide what to load, with incrementally
  allowed features (or media types). By default, the Stealth Browser will load
  nothing. The Site Mode next to the address bar decides what is loaded.

- It never requests anything unnecessary. The cache is persistent until the user tells
  it to refresh the Site manually (or a scheduled Scraper task is run for that URL).

- All downloaded websites and assets can be reused across all `Stealth Browser` peers
  in the local network. Additionally, as the Stealth Service serves its own Browser UI,
  you can reuse the cache in other Web Browsers. Bookmark as Web App on Android, and
  you have direct access to your downloaded wiki articles, yay!

- This ain't your Mama's Web Browser. It completely forbids to load ECMAScript (aka "AdScript")
  in order to improve privacy. It doesn't support Web Forms or anything, so it can be
  seen as a user-friendly automateable and scheduleable Web Scraper on steroids.

- Not drooling yet? The Stealth Browser also can be used as a Web Scraper inside `node.js`
  similar to what people wanted `Chromium Headless` to be, but didn't get the featureset
  they wanted. The [Browser](./browser/source) is completely free-of-DOM, so every single
  task and interaction that the [Browser UI](./browser/design) does can be implemented in
  an automateable and programmable manner.

- Okay, still not hooked? How about that: The Stealth Browser implements every single
  feature using its own peer-to-peer network services. That means that everything that
  happens behind the scenes can be done by different peers or shared as a computation
  task to other peers. Additionally, this means that you cannot only implement a server-side
  Browser that is used as a scheduled Web Scraper, but also a peer-to-peer network cluster
  of Web Scrapers that do huge computation tasks, like applying neural network fingerprinting
  to website contents and semantics. Isn't that awesome? I think it is.


## Stealth Browser Guide (for Hackers?)

- [Guide Index](./guide/README.md)
- [Stealth Concept Design](./guide/concept/Design.md)
- [Stealth Concept Architecture](./guide/concept/Design.md) (TBD)
- [Stealth Site Modes](./guide/concept/Modes.md)
- [Stealth Service API Usage](./guide/services/Usage.md)

Peer-to-Peer Services:

- [Cache](./guide/services/peer-to-peer/Cache.md)
- [Filter](./guide/services/peer-to-peer/Filter.md)
- [Host](./guide/services/peer-to-peer/Host.md)
- [Mode](./guide/services/peer-to-peer/Mode.md)
- [Peer](./guide/services/peer-to-peer/Peer.md)
- [Request](./guide/services/peer-to-peer/Request.md)
- [Settings](./guide/services/peer-to-peer/Settings.md)

Local Services:

- [Error](./guide/services/local/Error.md)
- [File](./guide/services/local/File.md)
- [Redirect](./guide/services/local/Redirect.md)


## Quickstart

If you don't wanna deal with the native build toolchain, this
is how to get started as quickly as possible:


Both [Browser](/browser/source) and [Stealth](/stealth/source)
are implemented using ECMAScript Modules (`.mjs`) in order to
`export` and `import` code.

This means that `node` version `10` or higher is required, and
a Web Browser or Web View that supportes ES6 Modules. If you're
unsure, use [Ungoogled Chromium](https://github.com/Eloston/ungoogled-chromium).

- Install `node` version `10+` for ES6 modules support.
- Install either a Web Browser of your choice or [nw.js](https://nwjs.io/downloads).


## Installation and Usage

```bash
cd /path/to/stealth-browser;

bash ./bin/stealth.sh;

# Open in Web Browser
gio open http://localhost:65432;

# Open in nw.js
# nw http://localhost:65432;
```


## Work in Progress

- [ ] Internal Page for `stealthfix-request` ( `internal/fix-request{html,mjs}`).
- [ ] Site Mode and Site Filters sidebar (`design/site.js`).



## License

The license is currently unclear and depends on how to finance this project later.
It will probably be licensed under GPL or MPL, but I gotta check with my lawyer
first, yo.

Therefore assume All Rights Reserved and (c) Cookie Engineer for now.


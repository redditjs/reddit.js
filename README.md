
# RedditJS 
[![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![coverage-image]][coverage-url] [![Discord][discord-image]][discord-url]

[npm-image]: https://img.shields.io/npm/v/redditjs
[npm-url]: https://npmjs.com/package/redditjs
[downloads-image]: https://img.shields.io/npm/dt/redditjs
[downloads-url]: https://npmjs.com/package/redditjs
[discord-image]: https://img.shields.io/discord/697857026180513833?label=Discord
[discord-url]: https://discord.gg/NR9X4YG
[coverage-image]: https://img.shields.io/badge/coverage-100%25-blue
[coverage-url]: https://www.reddit.com/dev/api

**RedditJS** is a JavaScript library for interacting with Reddit's official API. Not only  is it lightweight, it's also easy to use.
## Install
Install via `npm`:

	npm install --save redditjs
**RedditJS** requires `events` and `request-promise` as dependencies.

## Features

- 100% Promise-based
- Full coverage of Reddit's [`API`](https://www.reddit.com/dev/api)
- Extremely lightweight
- Feels intuitive to use

## Setup

To get started, you need to create an [app](https://www.reddit.com/prefs/apps). To understand how Reddit apps work, I suggest reading about it [here]([https://github.com/reddit-archive/reddit/wiki/oauth2](https://github.com/reddit-archive/reddit/wiki/oauth2)). 
### **Instructions**:
1. Create your app on Reddit (Either `Web App` or `Script`).
2. Follow the next steps [here]([https://github.com/reddit-archive/reddit/wiki/oauth2](https://github.com/reddit-archive/reddit/wiki/oauth2)).
3. Acquire your `refresh token`, `client id` and `client secret`.

## Usage

Now that you have everything you need, you can start writing some code. Here is an example for posting a link on Reddit.

```javascript
const Reddit = require('redditjs');
const client = new Reddit.Client({
	refresh_token: "refresh token",
	secret: "client secret",
	id: "client id"
});

client.on('authorized', () => {
	console.log(`Logged in! My token is ${client.token}`)
})

client.authenticate();

client.post('/api/submit', {
	sr: 'memes',
	resubmit: true,
	kind: 'link',
	title: 'Title for my Link',
	url: 'https://www.example.com'
}).then(results => {
	console.log(results)
});
```
### Expected Output
```json
{
  json: {
    errors: [],
    data: {
      url: 'link to message on reddit',
      drafts_count: 0,
      id: 'unique-ID',
      name: 't3_unique-ID'
    }
  }
}
```

# Documentation

At the time of this writing, no Documentation exists yet, as this package lacks features. For now, the functionality of this package will be shown here. 
*Code is case-sensitive.

## `Client` extends `EventEmitter`
### `Properties`
 - `Client.id` The id of the app you created
 - `Client.secret` The secret of your app
 - `Client.refresh_token` The token used to generate access tokens
 - `Client.token` The access token (Regenerated every **3950** seconds)
 - `Client.user_agent` (Optional) Your **User Agent**. Always try provide one.
 ### `Methods`
 - `Client.authenticate()` Authorize your app and generate an access token
 - `Client.get(path, options)` where
 --`path` = The api path you want to invoke
 -- `options` = The options required for the request
  - `Client.post(path, options)` where
 --`path` = The api path you want to invoke
 -- `options` = The options required for the request
  - `Client.put(path, options)` where
 --`path` = The api path you want to invoke
 -- `options` = The options required for the request
  - `Client.patch(path, options)` where
 --`path` = The api path you want to invoke
 -- `options` = The options required for the request
  - `Client.delete(path, options)` where
 --`path` = The api path you want to invoke
 -- `options` = The options required for the request
 ### `Events`
 - `authorized` Emitted when the `Client` successfully authenticated.
 
# FAQ
**Questions can be asked by creating an Issue or asking in my Discord server.**
If you have a suggestion, please tell me! I am not online everyday, so do not expect the fastest responses. If you would like to become a contributor for this repository or a mod in my Discord server, simply ask! 

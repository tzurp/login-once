# login-once

This plugin for [webdriver.io](https://webdriver.io/) saves the authentication data after the first login and then uses it for subsequent tests.

<h2>Installation</h2>
The easiest way to install this module as a (dev-)dependency is by using the following command:

```
npm install wdio-login-once-service --save-dev
```

<h2>Usage</h2>

Add wdio-login-once-service to your `wdio.conf.js`:

```
exports.config = {
  // ...
  services: [
      ['login-once',
        {
            // TODO: login method example: ()=> {LoginPage.login()}
            loginMethod: () => {},
            mainUrl: "https://webdriver.io/",
        }]
      ]
  // ...
};
```

<h2>Options</h2>

<h3>loginMethod</h3>
The login function that would be triggered.
Required: `true`.

<h3>mainUrl</h3>
The post-login URL (may be the same as the login URL if the page is riderected).
Required: `true`

<h2>Typescript support</h2>

Typescript is supported for this plugin.
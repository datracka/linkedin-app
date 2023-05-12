# How to configure in a NodeJS / Express App a https server (localhost)

## Prerequisites

Intel Mac running 13.3.1 (22E261)

## Overview

we will make that a express app can be reached in a browser with a `https://localhost` url
Prerequisites: you have a working express app working on `http://localhost`

> This is mostly a documentation for me as I have to do it once in a while and always I forget :) hopefully it helps some of you

## 3 things to do:

* 1 - Create a certificate 
* 2 - add it your computer's keychain.
* 3 - Make NodeJS aware of it.

### 1 - Create a certificate


Go to your nextJS project and run the followig commands in the command line:

* `$> openssl genrsa -out server.key 2048` to create a `server.key` file
* `openssl req -new -x509 -key server.key -out server.cert -days 365` to create, using the above `server.key` file a `server.cert` certificate. Actually the CERTIFICATE

> VERY IMPORTANT, in the second step you will be prompted to answer some questions! When asked for `"Common Name (eg, fully qualified host name) []:"` set `"localhost"`

After running this 2 commands you will have 2 files:

`server.key` and `server.cert`

> Advice: if you are in your project's root and execute the commands above the files will be added in the root folder. For clarity I created a folder `"certificates"` and put the files there `"certificates/server.key"` `"certificates/server.crt"`. Also, better to gitignore the folder / files :)
>

### 2 - Add the certificate to your keychain

Now that we have our certificate `server.crt` created, you have to add it to your computer's keychain.

- Open `keychain Access.app` ( I usually do this by pressing cmd+spacebar and writing the name the App I want to open, but you can also go to your `apps` folder and look for it, then double click it!)

App that handles all certificates gets open.

- Go to `Login` option in the left bar and then look for the category `certificates`
- Then Drag & Drop the file `server.crt`


![Alt text](https://file%2B.vscode-resource.vscode-cdn.net/var/folders/wx/0xftrh315sn2mndl8l19kt3c0000gn/T/TemporaryItems/NSIRD_screencaptureui_w8Hcm4/Screenshot%202023-05-12%20at%2013.02.44.png?version%3D1683889384487)

- Select the file localhost -> contextual dialog "get Info" -> Look for "Trust" and open the accordion -> in "When Using this certificate" set "always Trust"

You will be prometed to set your admin password.

## 3 - Configure express.js app

- install `"https"` `"fs"` packages in case you don't have already installed them. (`npm i <package>`)

- Go to `app.js` file and add this lines

````javascript
/// add those imports
const https = require("https");
const fs = require("fs");

// more code

// Notice my app is looking for the files in <project>/certificates/ and I have an `app` object already initialized (if you followed express pattern you should have the same)
const options = {
  key: fs.readFileSync("certificates/server.key"),
  cert: fs.readFileSync("certificates/server.cert"),
};

https.createServer(options, app).listen(443, () => {
  console.log("Server started on https://localhost:443");
});
````

## That's all!

- Run the app 
- Go to `https://localhost` 
 
...and you should have a running https server :) 
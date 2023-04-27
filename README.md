# jitu-shop
jitu-shop

## START HERE

### WANT TO RUN LOCALLY?
- Clone this repo
- Install json-server with `npm install json-server` Visit Nodejs.org to install Nodejs which comes with npm if you already don't have it.
- `json-server db.json --watch` to run the database server.
- Open `index.html` in a browser.

### RUN LOCALLY WITH `NPM START`
- Clone this repo
- `git switch develop`
- `npm install`
- `npm start`
This will automatically setup json-server and give you the url to access the app with any device on your network.

Please note that there may be some minor difference between master, hosted-app, and develop, since they're all running differently.
**Hosted-app** uses a json-server hosted on Render (check the `json-server` branch for the code) and this is a bit slow, so changes to the app were necessary to accomadate such.
**master** is the default initial implementation that requires local setup.
**develop** automatically sets up both the app and database server with one command, `npm start` A couple changes were made here, including using express.js and json-server.

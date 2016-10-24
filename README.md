# NetCap

NetCap is a network monitor for your own computer; capturing packets and letting you see what data is being collected when you're surfing the web.

  - Simple Interface
  - Screenshot any site to see what it collected or sent
  - Shows url to add to firewall or blocker.

NetCap is a lightweight electron app designed for background use for surfing the web.

> NetCap's idea originated from Snowden and the principle
> that everyone has data being collected on them
> but we are never sure what that data is.
> Users should be able to see every request
> without installing an entire library on the router


### Tech

Dillinger uses a number of open source projects to work properly:

* [ReactJS](https://facebook.github.io/react/) - Facebook's Front-end Framework
* [Twitter Bootstrap] - Twitter's Responsive CSS Library
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [httpcap](https://github.com/caoqianli/httpcap) - Great packet capturing service [@caoqianli](https://github.com/caoqianli)
* [Electron](https://github.com/electron/electron) - Github's Cross-platform Desktop App Maker
* [Babel](https://babeljs.io/) - Transpiler for es6 for react
* [Webpack](https://webpack.github.io/) - Bundler for deployment and makes it easy to reference files client-side
* [PhantomJS](http://phantomjs.org/) - Headless Browser for taking screenshots of pages
* [ChaiJS](http://chaijs.com/) - Testing suite along with Mocha
* [MochaJS](https://mochajs.org/) - Testing suite for NodeJS
* [Dillinger][dill] - Cool online markdown editor for this readme

[Repository](https://github.com/JulianKnodt/NetCap)
 on GitHub.

### Installation

NetCap requires [Node.js](https://nodejs.org/) and [Electron](https://github.com/electron/electron) to run.


Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm run electron 
If changing the front end:
$ webpack -w
```

Or if testing in web browser

```sh
$ npm run dev
OR
$ npm start
```


Want to contribute? Submit a pull request and ensure that all tests are working.



### Todos

 - TravisCI
 - Better front-end design
 - More features


License
----

MIT

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [@thomasfuchs]: <http://twitter.com/thomasfuchs>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>

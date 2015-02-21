Testing Async Functions in PouchDB
=====

[![Build Status](https://travis-ci.org/nolanlawson/async-functions-in-pouchdb.svg)](https://travis-ci.org/nolanlawson/async-functions-in-pouchdb)

Testing the library
----

### In Node

To run the main tests, just do:

    npm test
    
To run the code coverage tests, run:

    npm run coverage

To run just the jshint tests, run:

    npm run jshint

### In the browser

Run `npm run dev` and then point your favorite browser to [http://127.0.0.1:8001/test/index.html](http://127.0.0.1:8001/test/index.html).

The query param `?grep=mysearch` will search for tests matching `mysearch`.

### Automated browser tests

You can run e.g.

    CLIENT=selenium:firefox npm test
    CLIENT=selenium:phantomjs npm test

This will run the tests automatically and the process will exit with a 0 or a 1 when it's done. Firefox uses IndexedDB, and PhantomJS uses WebSQL.

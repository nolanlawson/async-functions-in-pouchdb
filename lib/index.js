"use strict";

let PouchDB = require('pouchdb');

async function runTest() {
  let db = new PouchDB('mydb');

  let info = await db.info();

  console.log('here is the info', info);
}

module.exports = runTest;
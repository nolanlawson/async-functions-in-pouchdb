"use strict";

let PouchDB = require('pouchdb');

async function runTest() {
  let db = new PouchDB('mydb');

  try {
    await db.put({_id: 'doc'}) ;
  } catch (err) {
    if (err.status !== 409) {
      throw err;
    }
  }

  let doc = await db.get('doc');
  let info = await db.info();

  console.log('here is the info and the doc', info, doc);
}

module.exports = runTest;
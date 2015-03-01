"use strict";

let PouchDB = require('pouchdb');
let db = new PouchDB('mydb');

async function demo1() {
  try {
    // put a document
    await db.put({_id: 'doc'}) ;
  } catch (err) {
    if (err.status !== 409) {
      // ignore conflict errors (i.e. the doc already exists)
      throw err;
    }
  }

  // get the doc
  let doc = await db.get('doc');

  console.log('here is the doc', doc);
}

async function demo2() {
  // put multiple docs in a regular for loop
  let docs = [{}, {}, {}];
  for (let i = 0; i < docs.length; i++) {
    let doc = docs[i];
    let result = await db.post(doc);
    let savedDoc = await db.get(result.id);
    console.log('put a new doc in a regular for loop, here it is', savedDoc);
  }
}

async function demo3() {
  // put multiple docs in a loop
  let docs = [{}, {}, {}];
  docs.forEach(async function (doc) {
    let result = await db.post(doc);
    let savedDoc = await db.get(result.id);
    console.log('put a new doc in a forEach loop, here it is', savedDoc);
  });
}

module.exports = {
  demo1,
  demo2,
  demo3
};
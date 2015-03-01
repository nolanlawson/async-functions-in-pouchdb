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

async function demo4() {
  // posts a doc inside a try/catch
  async function createNewDoc() {
    let response = await db.put({});
    return await db.get(response.id);
  }

  async function printNewDoc() {
    try {
      let doc = await createNewDoc();
      console.log('posted a new doc', doc);
    } catch (err) {
      console.log(err);
    }
  }

  printNewDoc();
}

async function demo5() {
  // puts a doc inside a try/catch without an _id (will throw)
  async function createNewDoc() {
    let response = await db.put({});
    return await db.get(response.id);
  }

  async function printNewDoc() {
    try {
      let doc = await createNewDoc();
      console.log(doc);
    } catch (err) {
      console.log('expected an error, caught it', err);
    }
  }

  printNewDoc();
}

async function demo6() {
  try {
    let docs = [{}, {}, {}];

    // also works: let promises = [for (doc of docs) db.post(doc)];
    let promises = docs.map((doc) => db.post(doc));

    let results = [];
    for (let promise of promises) {
      results.push(await promise);
    }

    console.log('posted many docs simultaneously, results are ', results);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  demo1,
  demo2,
  demo3,
  demo4,
  demo5,
  demo6
};
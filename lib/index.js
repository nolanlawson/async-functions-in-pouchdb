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
  // posts a doc inside a try/catch. this should throw an error
  async function createNewDoc() {
    let response = await db.put({});
    return await db.get(response.id);
  }

  async function printNewDoc() {
    try {
      let doc = await createNewDoc();
      console.log('posted a new doc', doc);
    } catch (err) {
      console.log('expected an error, got it', err);
    }
  }

  printNewDoc();
}

async function demo3() {
  // put multiple docs in a regular for loop
  let docs = [{}, {}, {}];
  for (let i = 0; i < docs.length; i++) {
    let doc = docs[i];
    let result = await db.post(doc);
    let savedDoc = await db.get(result.id);
    console.log('put a new doc in a regular for loop, here it is', savedDoc);
  }

  console.log('regular for loop\'s main function finished');
}

async function demo4() {
  // put multiple docs in a loop
  let docs = [{}, {}, {}];
  for (let doc of docs) {
    let result = await db.post(doc);
    let savedDoc = await db.get(result.id);
    console.log('put a new doc in a forOf loop, here it is', savedDoc);
  }

  console.log('forOf loop\'s main function finished');
}

async function demo5() {
  // put multiple docs in a loop
  let docs = [{}, {}, {}];
  docs.forEach(async function (doc, i) {
    console.log('async forEach: starting to wait for ', i);
    let result = await db.post(doc);
    await db.get(result.id);
    console.log('async forEach: done waiting for', i);
  });
  console.log('async forEach: main function finished');
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

async function demo7() {
  try {
    let docs = [{}, {}, {}];

    // also works: let promises = [for (doc of docs) db.post(doc)];
    let promises = docs.map((doc) => db.post(doc));

    let results = await Promise.all(promises);

    console.log('posted many docs simultaneously using Promise.all, results are ', results);
  } catch (err) {
    console.log(err);
  }
}

async function demo8() {
  try {
    let docs = [{}, {}, {}];

    // also works: let promises = [for (doc of docs) db.post(doc)];
    let promises = docs.map((doc) => db.post(doc));

    let results = await* promises;

    console.log('posted many docs simultaneously using await*, results are ', results);
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
  demo6,
  demo7,
  demo8
};

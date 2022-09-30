import { Firestore } from '@google-cloud/firestore'
import * as dotenv from 'dotenv'
dotenv.config()

const db = new Firestore({
  projectId: process.env['FIRESTORE_PROJECT_ID'],
})

const users = db.collection('users').doc('jdoe')

const f = async () => await users.set({
  name: 'John Doe',
  age: 21,
})
f()
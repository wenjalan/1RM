import { Firestore } from '@google-cloud/firestore'
import * as dotenv from 'dotenv'
import User from './models/User'
dotenv.config()

const firestore = new Firestore({
  projectId: process.env['FIRESTORE_PROJECT_ID'],
})

const collections = {
  users: firestore.collection('users')
}

async function addUser(user: User) {
  await collections.users.doc(user.id).set(user)
}

async function hasUser(userId: string) {
  const user = await collections.users.doc(userId).get()
  return user.exists
}

async function getUser(userId: string): Promise<User> {
  const user = await collections.users.doc(userId).get()
  if (!user.exists) Promise.reject(`No such user id ${userId}`)
  return user.data() as User
}

async function deleteUser(userId: string) {
  await collections.users.doc(userId).delete()
}

export default {
  addUser,
  hasUser,
  getUser,
  deleteUser
}
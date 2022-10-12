import { Firestore } from '@google-cloud/firestore'
import * as dotenv from 'dotenv'
import Session from './models/Session'
import User from './models/User'
dotenv.config()

const firestore = new Firestore({
  projectId: process.env['FIRESTORE_PROJECT_ID'],
})

const collections = {
  users: firestore.collection('users'),
  sessions: firestore.collection('sessions')
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

async function addSession(session: Session) {
  await collections.sessions.doc(session.id).set(session)
}

async function getSession(sessionId: string) {
  const session = await collections.sessions.doc(sessionId).get()
  if (!session.exists) Promise.reject(`No such session id ${sessionId}`)
  return session.data() as Session
}

async function getSessionLog(userId: string) {
  if (!hasUser(userId)) Promise.reject(`No such user ${userId}`)
  const queryResult = await collections.sessions.where("userId", "==", userId).get()
  return queryResult.docs.map(doc => doc.data()) as Session[]
}

export default {
  addUser,
  hasUser,
  getUser,
  deleteUser,
  addSession,
  getSession,
  getSessionLog,
}
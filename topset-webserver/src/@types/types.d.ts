import session from 'express-session'
import { Express } from 'express'

declare module 'express-session' {
  export interface SessionData {
    passport: {
      user: User
    }
  }
}

declare module 'express' {
  export interface Request {
    session: SessionData
  }
}
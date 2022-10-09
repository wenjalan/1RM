import session from 'express-session'
import { Express } from 'express'

declare module 'express-session' {
  export interface SessionData {
    passport: {
      user: User
    }
  }
}
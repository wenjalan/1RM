import Movement from "./Movement"

export default interface Session {
  id: string
  userId: string
  date: string
  movement: Movement
  weight: number
  reps: number
  sets: number
}
import Movement from "./Movement"

export default interface Session {
  id: string
  date: string
  movement: Movement
  weight: number
  reps: number
  sets: number
}
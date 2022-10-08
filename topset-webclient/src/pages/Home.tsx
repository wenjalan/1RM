import { Card, Divider, Stack } from "@mui/material";


interface HomeProps {
  name: string
}

const props = {
  name: 'Alan Wen',
  bodyweight: '170 lbs'
}

export default function Home() {
  return (
    <Stack
      sx={{
        width: '100%'
      }}
      spacing={2}
    >
      <Header />
      <Log />
    </Stack>
  )
}

interface HeaderProps {
  name: string
  bodyweight: string
}

function Header() {
  return (
    <Card sx={{
      padding: '1em'
    }}>
      <Stack>
        <b>{props.name}</b>
        <em>{props.bodyweight}</em>
      </Stack>
    </Card>
  )
}

function Log() {
  return (
    <Card sx={{
      padding: '1em'
    }}>
      <b>Log</b>
      <Stack divider={<Divider />}>
        <Session weight="225 lbs" date="10/6/22" reps={8} />
        <Session weight="275 lbs" date="9/29/22" reps={5} />
        <Session weight="185 lbs" date="9/21/22" reps={10} />
      </Stack>
    </Card>
  )
}

interface SessionProps {
  weight: string
  reps: number
  date: string
}

function Session(props: SessionProps) {
  return (
    <Stack sx={{
      padding: '1em'
    }}>
      <b>{props.weight} for {props.reps}</b>
      <em>{props.date}</em>
    </Stack>
  )
}
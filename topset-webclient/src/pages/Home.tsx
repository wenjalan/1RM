import { Card, Divider, Grid, Stack, Typography } from "@mui/material";
import User from "../model/User";

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

function Header() {
  return (
    <Card sx={{
      padding: '1em'
    }}>
      <Stack>
        <Typography sx={{ fontWeight: 'bold' }}>{"Alan Wen"}</Typography>
        <Typography>{"170 lbs"}</Typography>
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
        <Session />
        <Session />
        <Session />
      </Stack>
    </Card>
  )
}

function Session() {
  return (
    <Stack sx={{
      padding: '1em'
    }}>
      <Grid container direction='row'>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 'bold' }}>{"225"} for {"8"}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align='left'>{"85% of 1RM"}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align='right'>{"2 days ago"}</Typography>
        </Grid>
      </Grid>
    </Stack>
  )
}
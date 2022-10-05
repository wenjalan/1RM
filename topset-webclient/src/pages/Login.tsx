import { Link, Divider, Card, Stack, Button, Typography } from '@mui/material'

export interface LoginProps {
  googleLoginRedirect: string
}

export default function Login(props: LoginProps) {
  return (
    <Stack
      sx={{
        flex: 1
      }}
      alignItems='center'
      alignContent='center'
      justifyContent='center'
    >
      <Card
        sx={{
          padding: '2em'
        }}
      >
        <Stack direction='column' spacing={2} divider={<Divider orientation='horizontal' />}>
          <Typography align='center' variant='h3'>Top Set</Typography>
          <Button href={props.googleLoginRedirect} variant='contained'>Log in with Google</Button>
        </Stack>
      </Card>
    </Stack>
  )
}
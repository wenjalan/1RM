// express server
import express from 'express';
import { Request, Response } from 'express';

// create express app
const app = express();

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

// start the Express server
app.listen(3000, () => {
  console.log('server started at http://localhost:3000');
});
import express from 'express';
import bodyParser from 'body-parser';
import { restApiMaoConNRouter } from './controllers/restApi1Controller';
import { restApiNikeRouter } from './controllers/restApi2Controller';
import { soapApiAdidasRouter } from './controllers/soapApiController';

const app = express();
const port = 3750;

app.use(bodyParser.json());
app.use('/api/maoconn', restApiMaoConNRouter);
app.use('/api/nike', restApiNikeRouter);
app.use('/api/adidas', soapApiAdidasRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

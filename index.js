import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { configRoutes } from './routes/index.js';
import { controlError, errorHandler } from './middlewares/errors.middlewares.js';
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.PORT || 3001


const corsConfig = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
}

// app.use(cors(corsConfig))

app.use(express.json());
configRoutes(app)
// app.use(express.json())


app.use(errorHandler)
app.use(controlError)

// errorHandler

app.listen(PORT, () => {
    console.log('Server de ia con librerias corriendo en el puerto ' + PORT)
})
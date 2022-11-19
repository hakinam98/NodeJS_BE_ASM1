const cors = require('cors');
const http = require('http')
const errController = require('./controllers/err')
const express = require('express');



const app = express();
app.use(express.json());

app.use(cors());

const moviesRoutes = require('./routers/movie');


app.use(moviesRoutes)
app.use(errController.get404)

const server = http.createServer(app);
server.listen(5000);
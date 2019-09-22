require('dotenv').config()
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/users')
const mongoose = require('mongoose');

// Set up mongo database from the cloud
if (process.env.NODE_ENV === 'test') { // Test
  mongoose.connect('mongodb+srv://avnv:' +
    process.env.MONGO_ATLAS_TEST_PASSWORD +
    '@cluster0-rwh1t.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
} else { // Development database
  mongoose.connect('mongodb+srv://bjnis:' +
    process.env.MONGO_ATLAS_PASSWORD +
    '@tagwithmecluster-g3kgt.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
}



app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

app.use(morgan('dev'));

/* 
    <------------------ Insert Cors Here -------------------->
*/

app.use('/user', userRoutes);

// If no requests go through. Show a 404 error
app.use((req, res, next) => {
  const err = new Error('Resource not found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500); // 500 refers to internal database error
  res.json({
    error: {
      message: err.message
    }
  })
})

const httpServer = http.createServer(app)
const portForHTTP = process.env.PORT_HTTP || 8848
httpServer.listen(portForHTTP, function () {
  console.log("Server started successfully on localhost at port:", portForHTTP)
})

module.exports = app
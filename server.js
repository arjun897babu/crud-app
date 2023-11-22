const express = require('express');
const dotenv=require('dotenv')
const morgan = require('morgan');
const session = require('express-session');
const app = express();
dotenv.config( { path : 'config.env'} )
const connectDB = require('./server/database/connection')
const route = require('./server/routes/routes')
const path = require('path') 
 //session 
 app.use(session({ 
  secret:'key',
  resave: true,
  saveUninitialized: true 
}));
   
//clear cache
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
  res.setHeader("Pragma", "no-cache"); 
  res.setHeader("Expires", "0");
  next()
});

// parse request to body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

 
//mongodb connection 
connectDB();
 
//set view engine 
app.set('view engine', 'ejs'); 
 


//loading assests
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
  
 
 
//loading routes 
app.use('/',require('./server/routes/routes'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
  


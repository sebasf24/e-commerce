const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
const passport= require('passport')
const localStrategy= require('passport-local').Strategy;
const bcrypt=require('bcrypt')//encripta el pass
const session= require('express-session');
const {User}= require('./db');
const server = express();
require('./db.js');
//server.use(cors());
server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

server.use(session({
  secret:'iniciarSesion', 
  resave:false, 
  saveUninitialized:true,
  // cookie:{maxAge: 60000 }
}))

server.use(cookieParser('iniciarSesion'));
server.use(passport.initialize())
server.use(passport.session());

// --------------CONFIGURACION DE PASSPORT
passport.use(

  new localStrategy({
    usernameField:'username',
    passwordField:'password'
  },
    (username, password, done)=>{
      console.log(username, password)
      User.findOne({
          where:{
              username: username
          }
      }).then((user)=>{
          if(!user){
              return done(null, false,{
                  message: 'Username inexistente'
              })
          }
          if(!user && User.validPassword(password)){
              return done(null, false,{
                  message: 'Contraseña incorrecta'
              })
          }
          if(user){
            return done(null, user)

          }    
      })
      .catch((error)=>{
          if(error){
              return done(error)
          }

      })

  })
)

passport.serializeUser((user, done)=> { 
  done(null, user.id);
});

passport.deserializeUser((id, done)=> { //lo necesita cuando le llega un id de una cookie
  User.findOne({where: id})
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});

// ---------------------------------------------------------------------
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

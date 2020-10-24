const{User}= require('./db');
const passport = require('passport');
// const bcrypt =require('bcryptjs');
const LocalStrategy= require('passport-local').Strategy;

passport.use('login',

  new LocalStrategy({
    usernameField:'username',
    passwordField:'password'
  },
    (username, password, done)=>{ //()req, username, pass, done
      console.log(username, password)
      User.findOne({
          where:{
              username: username
          }
      })
      .then((user)=>{
          if(!user){
              return done(null, false,{
                  message: 'Username inexistente'
              })
          }
          if(!user && user.validPassword(password)){
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
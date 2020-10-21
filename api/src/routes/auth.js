var express = require('express');
const server = express.Router();
const  {User} =require('../db');
const passport = require('passport');

isLogged= (req, res, next)=>{
    if (req.isAuthenticated() ) {return next()}
    else{
        res.json({
            loggedin: false,
            message: 'Usuario no autenticado',
          });
    }
};

isAdmin = (req, res, next) => {
    if (req.user.typeUser === 'Admin') return next();
    else
      return res.json({
        loggedin: false,
        isAdmin: false,
        message: 'No es Admin',
      });
};
  

server.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      
      if (err) {
       res.json({
          success: false,
          message: err.message,
          info,
        });
      }
      if (!user) {
        res.json({
          success: false,
          info,
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          res.json(err);
        }
        res.json({
          success: true,
          message: 'You have successfully logged in!',
          info,
          user,
        });
      });
    })(req, res, next);
  });


server.get('/logout', isLogged, (req, res)=> {
        req.logout();
        res.json({ message: 'Logged out!' });
});

module.exports =server;

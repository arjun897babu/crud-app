const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller'); 

const isAuth = function(req,res,next){
  if(req.session.isAuthed){ 
    next(); 
  }else{
    res.redirect('/user-login')
  }
}

const isAuthAdmin = function(req,res,next){
  if(req.session.isAuthed){
    res.redirect('/')
  }else{
    next();
  }
}

const isUserLogged = function(req,res,next){
  if(req.session.isUserAuthed){
    next();
  }else{
    res.redirect('/user-login')
  }
}
const isUserLoggedOut = function(req,res,next){
  if(req.session.isUserAuthed){
    res.redirect('/user-home')
  }else{
    next();
  }
} 

//admin
route.get('/',isAuth, services.homeRoutes)  //rendering admin home page


route.get('/add-user',isAuth,services.add_user); //rendering add_user


route.get('/update-user',isAuth, services.update_user); //rendering update_user


route.get('/admin-login',isAuthAdmin,services.adminlogin); //rendering admin login page 

route.post('/admin-login',services.adminTrue); //admin login authentication

route.post('/logout',services.logoutAdmin); //logging out admin

//user

route.get('/user-login',isUserLoggedOut,isAuthAdmin,services.userLogin);//rendering user login page

route.get('/register-user',isUserLoggedOut,isAuthAdmin,services.userRegister);//render user register

route.get('/user-home',isUserLogged,services.userHome);//user login  validation

route.post('/user-logout',services.userLogout);//user home page logout





//api

route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete)

route.post('/api/login',controller.isUser);

route.get("*", services.notFound); // 404 error

module.exports = route;
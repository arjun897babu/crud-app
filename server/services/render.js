
const axios = require('axios');
const adminUserID = 'arjun123@gmail.com';
const adminPassword = 'qwerty123';




exports.homeRoutes = (req,res)=>{

  axios.get('http://localhost:3001/api/users')
    .then(function(response){
      res.render('index',{users:response.data})
    }) 
    .catch(err=>{
      res.send(err)
    })  
}


exports.add_user = (req,res)=>{
  req.session.isValidate = false;
  res.render('add_user',{isValid:req.session.emailIsValid})
}

exports.update_user = (req,res)=>{

  axios.get('http://localhost:3001/api/users',{params:{id:req.query.id}})
    .then(function(userdata){

      res.render('update_user',{user:userdata.data})
    })
    .catch(err=>{ 
      res.send(err)
    })
  
}

//admin_login page
exports.adminlogin = (req,res)=>{
 res.render('admin_login',{notValid:req.session.notValid})

}
//login admin
exports.adminTrue = (req,res)=>{
  const {emailAdress,Password} = req.body;
  if(adminUserID===emailAdress&&adminPassword===Password){
    req.session.isAuthed = true;
    res.redirect('/')
  }else{
    req.session.notValid = true;
    res.redirect('/admin-login')
  }
}


//logging out admin

exports.logoutAdmin = (req,res)=>{
req.session.destroy();
res.redirect('/admin-login');
}

exports.notFound = (req,res)=>{
  res.send(`error 404:page not found`)
}

//for user

exports.userLogin = (req,res)=>{
  req.session.emailIsValid = false;
  res.render('user_login',{user:req.session.isValidate});
}
exports.userRegister = (req,res)=>{
  req.session.isValidate = false;
  res.render('user_register',{isValid:req.session.emailIsValid })
}

exports.userHome = (req,res)=>{
  
  res.render('user_home',{userName:req.session.userName})
}

//logout user

exports.userLogout = (req,res)=>{
  req.session.destroy();
  res.redirect('/user-login')
}


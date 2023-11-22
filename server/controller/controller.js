const userDB = require('../model/model');




//create and save new user

exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: 'content cannot be empty' });
    return;
  }
  // new user 
  const user = new userDB({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,

  })
  //
  user
    .save(user)
    .then(data => {
      req.session.emailIsValid = false;
      if (req.query.page == 'user') {
        res.redirect('/user-login');
      } else {
        res.redirect('/add-user');
      }
    })
    .catch(err => {
      req.session.emailIsValid = true;
      if (req.query.page == 'user') {
        res.redirect('/register-user');
      } else {
        res.redirect('/add-user');
      }
    })
};

//check user login
exports.isUser = (req, res) => {
  if (!req.body) {
    res.status(400).redirect('/user-login');
    return
  }

  const { email, password } = req.body;

  userDB.find({ email, password })
    .then(data => {
      const [dataObj] = data;
      if (dataObj) {
        req.session.isUserAuthed = true;
        req.session.userName = dataObj.name
        res.redirect('/user-home');

      } else {
        req.session.isValidate = true;
        res.status(400).redirect('/user-login')
      }
    })
    .catch(err => {
      req.session.isValidate = true;
      res.status(500).send({ message: 'Error while retriving' })
    })

}

//get user

exports.find = (req, res) => {

  if (req.query.id) {
    const id = req.query.id;
    userDB.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: `not found user wit h the id:${id}` })
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: `error finding the user with the id:${id}` });
      })

  } else {
    userDB.find()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({ message: err.message || 'error occured while retriving user information' })
      })
  }

};


//update a new identified by user id
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res
      .status(400).send({ message: 'data to update cannot be empty' })
  }

  userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `cannot update user with ${id}. May be user not found` })
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: `error update user information` })
    })

};

//delete the userdetails by admin 

exports.delete = (req, res) => {

  const id = req.params.id;

  userDB.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `cannot delelte with ${id} is may be not found` })
      } else {
        res.send({ message: 'user was deleted successfully' })
      }
    })
    .catch(err => {
      res.status(500).send({ message: `could not delete user with id :${id}` })
    })

}

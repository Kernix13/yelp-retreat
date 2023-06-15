const User = require('../models/user');

/* Render register form */
module.exports.renderRegister = (req, res) => {
  res.render('users/register')
}

/* Create/register new user */
module.exports.register = async (req, res, next) => {
  try {    
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if(err) return next(err);
      req.flash('success', 'Welcome to YelpRetreat');
      res.redirect('/retreats');
    });
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/register');
  }
}

/* Render login form */
module.exports.renderLogin = (req, res) => {
  res.render('users/login');
}

/* Login user */
module.exports.login = (req, res) => {
  req.flash('success', "Welcome back!");
  // console.log(req.session.returnTo)
  const redirectUrl = res.locals.returnTo || '/retreats';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
}

/* Logout user */
module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/retreats');
  });
}
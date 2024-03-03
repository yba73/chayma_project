const Joi = require("joi");

// Validate data from client to register user info
/*======= ValdiateRegister ========*/
const valdiateRegister = (user) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(3).max(100).required(),
    email: Joi.string().trim().min(4).max(100).email().required(),
    password: Joi.string().trim().min(6).required(),
    firstName: Joi.string().trim().min(3),
    lastName: Joi.string().trim().min(3),
  });
  return schema.validate(user);
};
/*=======// ValdiateRegister //========*/

/*======= ValdiateRegister ========*/
const valdiateRegisterAdmin = (user) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(4).max(100).email().required(),
    password: Joi.string().trim().min(6).required(),
    username: Joi.string().trim().min(3).max(100).required(),
  });
  return schema.validate(user);
};
/*=======// ValdiateRegister //========*/

/*======= valdiateLogin ========*/
const valdiateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(4).max(100).email().required(),
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(user);
};
/*=======// valdiateLogin //========*/

/*======= ValdiateUdatedUser ========*/
const valdiateUdatedUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(3).max(100).required(),
    firstName: Joi.string().trim().min(3),
    lastName: Joi.string().trim().min(3),
  });
  return schema.validate(obj);
};
/*=======// ValdiateUdatedUser //========*/
/*======= validateforgotPassword ========*/
const validateforgotPassword = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(4).max(100).email().required(),
  });
  return schema.validate(obj);
};
/*=======// validateforgotPassword //========*/
module.exports = {
  valdiateRegister,
  valdiateUdatedUser,
  valdiateLogin,
  valdiateRegisterAdmin,
  validateforgotPassword,
};

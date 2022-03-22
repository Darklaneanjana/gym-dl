const joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = joi.object({
    fName: joi.string().required().min(5).max(100),
    lName: joi.string().required().min(5).max(100),
    uName: joi.string().required().min(5).max(50),
    nic: joi.string().required().min(10).max(12),
    dob: joi.date().required(),
    email: joi.string().required().max(50).email(),
    gender: joi.string().required().max(1),
    address: joi.string().required().min(10).max(100),
    pNumber: joi.string().required().min(10).max(12),
    Qualifications: joi.required(),
    expYears: joi.number().required(),
    password: joi.string().required().min(8).max(50),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    // uName: joi.string().required().min(5).max(50),
    email: joi.string().required().max(50).email(),
    password: joi.string().required().min(8).max(50),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };

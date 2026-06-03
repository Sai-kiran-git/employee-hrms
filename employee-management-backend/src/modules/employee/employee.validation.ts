import Joi from 'joi';

export const createEmployeeValidation = Joi.object({
  employeeId: Joi.string().required(),

  firstName: Joi.string()
    .min(2)
    .max(50)
    .required(),

  lastName: Joi.string()
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  phoneNumber: Joi.string()
    .required(),

  department: Joi.string()
    .required(),

  designation: Joi.string()
    .required(),

  joiningDate: Joi.date()
    .required(),

  address: Joi.string()
    .required(),

  profileImage: Joi.string()
    .optional(),
});

export const updateEmployeeValidation =
  Joi.object({
    firstName: Joi.string(),

    lastName: Joi.string(),

    email: Joi.string().email(),

    phoneNumber: Joi.string(),

    department: Joi.string(),

    designation: Joi.string(),

    joiningDate: Joi.date(),

    address: Joi.string(),

    profileImage: Joi.string(),
  });
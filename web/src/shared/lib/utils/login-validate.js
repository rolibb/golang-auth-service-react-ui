import { isEmailValid } from './email';

export const loginValidate = (email, password) => {
  const error = {
    email: true,
    password: true,
  };

  console.log(email, password);

  if (!email) {
    error.email = false;
  } else if (email && !isEmailValid(email)) {
    error.email = false;
  }

  if (!password) {
    error.password = false;
  }

  console.log(error);

  return error;
};

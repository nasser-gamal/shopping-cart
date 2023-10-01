export const register = {
  security: {
    jwt: [],
  },
  tage: ['Auth'],
  description: 'This route allow you to register',
  oprationId: 'register',
};

export const login = {
  security: {
    jwt: [],
  },
  tage: ['Auth'],
  description: 'This route allow you to login',
  oprationId: 'login',
};

export const forgetPassword = {
  security: {
    jwt: [],
  },
  tage: ['Auth'],
  description: 'This route allow you to forget password',
  oprationId: 'forgetPassword',
};

export const resetPassword = {
  security: {
    jwt: [],
  },
  tage: ['Auth'],
  description: 'This route allow you to reset password',
  oprationId: 'resetPassword',
};

export const verifyPasswordCode = {
  security: {
    jwt: [],
  },
  tage: ['Auth'],
  description: 'This route allow you to verify reset password code',
  oprationId: 'verifyPasswordCode',
};

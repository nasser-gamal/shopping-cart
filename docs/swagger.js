import swaggerJSDoc from 'swagger-jsdoc';
import { login } from './auth.swagger.js';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Ecommerce API',
      description: 'Ap API for ecommerce using NodeJs & MonogDB',
      version: '1.0.0',
      contact: {
        name: 'Nasser Gamal',
        email: 'nassergamal2222@gmail.com',
        url: 'https://github.com/Braineanear',
      },
    },
    servers: [
      { url: 'localhost:8000', description: 'Development Server' },
      { url: 'production', description: 'Production Server' },
    ],
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          schema: 'bearer',
          in: 'header',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ jwt: [] }],
  },
  apis: ['../routes/*.js', '../controller/*.js'],
  // paths: {
  //   '/auth/login': {
  //     post: login,
  //   },
  // },
};

const swaggerDoc = swaggerJSDoc(options);

export default swaggerDoc;

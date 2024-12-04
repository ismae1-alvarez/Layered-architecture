import swaggerJSDoc from 'swagger-jsdoc';

const option: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Aplication Auth',
        description: 'API operation user',
      },
    ],
    info: {
      title: 'REST API Node.js / Express / TypeScript',
      version: '1.0.0',
      description: 'Rest Docs for User',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // security: [
    //     {
    //       bearerAuth: [],
    //     },
    // ],
  },

  apis: ['./src/api/auth/auth.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(option);

export { swaggerSpec };
// export default swaggerSpec;

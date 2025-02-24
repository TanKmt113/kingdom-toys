const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

// Cấu hình Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Xác định phiên bản OpenAPI
    info: {
      title: "Toys store", // Tiêu đề API
      version: "1.0.0", // Phiên bản API
      description: "API documentation using Swagger", // Mô tả ngắn gọn về API
    },
    servers: [
      {
        url: "http://localhost:3000", // Địa chỉ server của API
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      parameters: {
        RefreshToken: {
          name: "x-rtoken-id",
          in: "header",
          description: "The refresh token needed to authenticate",
          required: false,
          schema: {
            type: "string",
          },
        },
        SlugParam: {
          in: "path", // Sửa lại thành "path" thay vì "path"
          name: "slug", // Sửa lại để có tên tham số là "slug"
          required: true,
          schema: {
            type: "string",
          },
        },
        Id: {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
        },
        Skip: {
          in: "query",
          name: "skip",
          description: "Number of items to skip (for pagination)",
          required: false,
          schema: {
            type: "integer",
            default: 0,
          },
        },
        Limit: {
          in: "query",
          name: "limit",
          description: "Number of items to return (for pagination)",
          required: false,
          schema: {
            type: "interger",
            default: 30,
          },
        },
        Search: {
          in: "query",
          name: "search",
          description: "Search",
          required: false,
          schema: {
            type: "string",
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routers/*.route.js")],
};

// Tạo Swagger Docs
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;

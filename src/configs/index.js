const configs = {
  PORT: process.env.PORT,
  MONGOOSE: {
    PORT: process.env.DB_PORT,
    HOST: process.env.DB_HOST,
    NAME: process.env.DB_NAME,
  },
};

module.exports = {configs}

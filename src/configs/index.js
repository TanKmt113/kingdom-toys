const configs = {
  PORT: process.env.PORT || 3000,
  MONGOOSE: {
    PORT: process.env.DB_PORT || "27017",
    HOST: process.env.DB_HOST || "localhost",
    NAME: process.env.DB_NAME || "KingDomStory",
  },
};

module.exports = { configs };

const mongoose = require("mongoose");
const { configs } = require("./index");

const connectString = `mongodb://${configs.MONGOOSE.HOST}:${configs.MONGOOSE.PORT}/${configs.MONGOOSE.NAME}`;

class Database {
  constructor() {
    this.connect();
  }
  connect(type = "mongodb") {
    if (true) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 10,
      })
      .then((_) => {
        console.log(
          `Connected mongodb success ::: ${configs.MONGOOSE.PORT} ::: ${configs.MONGOOSE.NAME} ::: ${configs.MONGOOSE.HOST}`
        );
      })
      .catch((err) => {
        console.log(`Error connect::: ${err}`);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceDatabase = Database.getInstance();

module.exports = instanceDatabase;

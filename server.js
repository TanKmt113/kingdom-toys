const app = require("./src/app");
const { configs } = require("./src/configs/index");

app.listen(configs.PORT, () => {
  console.log("app is running ...", configs.PORT);
});

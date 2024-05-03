const app = require("./app");
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server is running at http://${host}:${port}`);
});

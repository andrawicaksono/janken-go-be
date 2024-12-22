const { app, port } = require("./src/server");

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

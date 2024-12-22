const { server, port } = require("./src/server");

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

import { app } from "./app.js";

const port = 3000;

// serving the app
app.listen(port, () =>
  console.log(`Contact-Us app listening on http://localhost:${port}!`)
);

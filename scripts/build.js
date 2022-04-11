const execa = require("execa");

(async () => {
  console.log("Building client...");

  await execa("npm", ["run", "build"], {
    cwd: __dirname + "/../client",
    stdout: process.stdout,
    stderr: process.stderr,
  });
})();

const execa = require("execa");

(async () => {
  console.log("Installing dependencies of backend...");

  await execa("npm", ["install"], {
    cwd: __dirname + "/../backend",
    stdout: process.stdout,
    stderr: process.stderr,
  });

  console.log("Installing dependencies of client...");

  await execa("npm", ["install"], {
    cwd: __dirname + "/../client",
    stdout: process.stdout,
    stderr: process.stderr,
  });
})();

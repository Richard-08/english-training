const execa = require("execa");

(async () => {
  execa("npm", ["run", "dev"], {
    cwd: __dirname + "/../client",
    stdout: process.stdout,
    stderr: process.stderr,
  });

  execa("npm", ["run", "dev"], {
    cwd: __dirname + "/../backend",
    stdout: process.stdout,
    stderr: process.stderr,
  });
})();

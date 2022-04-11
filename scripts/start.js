const execa = require("execa");

(async () => {
  console.log("🚀 Starting backend...");

  await execa("npm", ["run", "start"], {
    cwd: __dirname + "/../backend",
    stdout: process.stdout,
    stderr: process.stderr,
  });

  console.log("🚀 Starting client...");

  await execa("npm", ["run", "start"], {
    cwd: __dirname + "/../client",
    stdout: process.stdout,
    stderr: process.stderr,
  });
})();

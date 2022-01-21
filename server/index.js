const config = require("./config");
const express = require("express");
const cors = require("cors");

const lessons = require("./routes/lessons");
const lesson = require("./routes/lesson");
const dictionary = require("./routes/dictionary");
const users = require("./routes/users");

const authMiddleware = require("./middleware/auth");

const PORT = config.PORT || 3300;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/auth", users);
app.use("/lessons", authMiddleware, lessons);
app.use("/lesson", authMiddleware, lesson);
app.use("/dictionary", authMiddleware, dictionary);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

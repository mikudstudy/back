const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbService = require("./services/db.service");
const app = express();
const enableCors = require("./middlewares/cors.js");
const http = require("http").createServer(app);
const dotenv = require("dotenv");
const session = require("express-session");

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false, // Force save of session for each request
    saveUninitialized: true, // Save a session that is new, but has not been modified
    cookie: { maxAge: 10 * 60 * 1000 }, // milliseconds!
  })
);

const allowedOrigins = [
  "https://www.mikudstudy.vercel.app",
  "https://mikudstudy.vercel.app",
  "https://www.mikudstudy.netlify.app",
  "https://mikudstudy.netlify.app",
  "https://www.mikudstudy.com",
  "https://mikudstudy.com",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:8080",
  "http://localhost:8080",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "https://api.mikudstudy.com",
  "http://localhost:5173",
  "http://127.0.0.1:5174",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));
/* }  */

dotenv.config();
dbService.connect();
// Express App Config
app.use(enableCors);

const authRoutes = require("./api/auth/auth.routes");
const userRoutes = require("./api/user/user.routes");
const contactRoutes = require("./api/contact/contact.routes");
const marathonRoutes = require("./api/marathon/marathon.routes");
const lessonRoutes = require("./api/lesson/lesson.routes");
const { setupSocketAPI } = require("./services/socket.service");

/*// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)*/

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/lesson", lessonRoutes);
app.use("/api/marathon", marathonRoutes);

setupSocketAPI(http);

app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const logger = require("./services/logger.service");
const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log("p", process.env.NODE_ENV);
  logger.info("Server is running on port: " + port);
});

// fs.writeFile('test.json', JSON.stringify(other), 'utf-8', () => {
//   console.log('success')
// })

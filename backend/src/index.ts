import express from "express";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import userRoutes from "./routes/user";
import docRoutes from "./routes/documents";
import contentRoutes from "./routes/content";
import session from "express-session";
import sessionStore from "./models/session";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = ["http://localhost:5173"];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // since we're using sessions
};

app.use(cors(corsOptions));
app.use(
  session({
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 3600 * 24 * 7,
    },
  })
);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("from server from server", error);
  const statusCode = 500;
  const message = "an error occured";
  res.status(statusCode).json({ message: message });
});

app.use("/api/user", userRoutes);
app.use("/api/documents", docRoutes);
app.use("/api/content", contentRoutes);

app.listen(port || 8000, () => {
  console.log("we are server is running at port", port);
});

export default app;

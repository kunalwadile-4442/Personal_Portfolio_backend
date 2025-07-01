import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Create express app
const app = express();

// Cookie Parser first
app.use(cookieParser());

// CORS last before routes
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// JSON + Form parsers
app.use(express.json({ limit: process.env.LIMIT_JSON }));
app.use(express.urlencoded({ extended: true, limit: process.env.LIMIT_JSON }));

// Static files (before routes)
app.get("/", (_, res) => {
  res.json({ message: "API working 🎉" });
});

app.use(express.static("public"));



// routes
import userRouter from "./routes/user.routes.js"
import heroesRouter from "./routes/hero.routes.js";
import aboutRouter from "./routes/about.routes.js";
import techstackRouter from "./routes/techstack.routes.js";
import projectRouter from "./routes/project.routes.js";
import experianceRouter from "./routes/experiance.routes.js";
import contactRouter from "./routes/contact.routes.js";

// routes delecration 
app.use("/api/v1/users", userRouter);
app.use("/api/v1/heroes", heroesRouter);
app.use("/api/v1/about", aboutRouter);
app.use("/api/v1/techstack", techstackRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/experiance", experianceRouter);
app.use("/api/v1", contactRouter);


export default app;

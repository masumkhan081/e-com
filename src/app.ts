 
import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
// import formidable from 'express-formidable';
import httpStatus from "http-status";
import RootRoutes from "./root.route";

const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:5173",
  "http://localhost:5000",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
//
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(formidable());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
//
app.get("/", (req, res) => {
  res.status(200).json({
    status_code: httpStatus.OK,
    success: true,
    message: "I am functional !",
    data: null,
  });
});

app.use("/api", RootRoutes);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;

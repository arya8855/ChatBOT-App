require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const app = express();

app.set("trust proxy", 1);

connectDB();

app.use(express.json());
app.use(cookieParser());

//CORS
const allowedOrigins = [
  "http://localhost:5173",
   "https://chat-bot-app-red.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const { errorMiddleware } = require("./middleware/errorMiddleware");
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatbotRoutes');
const leadRoutes = require('./routes/leadRoutes');

// Route handlers
app.use("/auth", authRoutes);
app.use('/lead', leadRoutes);
app.use('/chat', chatRoutes);

//last preference
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})



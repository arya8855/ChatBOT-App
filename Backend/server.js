require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

//CORS
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
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



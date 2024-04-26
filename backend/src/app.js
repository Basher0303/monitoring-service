require("dotenv").config();
const url = process.env.MONGODB;
const port = process.env.PORT;

const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/ErrorMiddleware");

const path = require('path');
const app = express();

mongoose
	.connect(url)
	.then(() => {
		console.log("Connected to database!");
	})
	.catch((e) => {
		console.log("Not Connected to database!", e);
	});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use("/api", routes);
app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.get('/', async (req, res) => {
	res.status(200);
	res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});
app.listen(port, () => {
	console.log(`Listening on port ${port}\nhttp://localhost:${port}`);
});
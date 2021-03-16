"use strict";

import express from "express";
import cors from "cors";

const port = 3000;

const app = express();
app.use(express.static("public"));
app.use(cors());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.get("/", (req, res, next) => {
	res.send("success");
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

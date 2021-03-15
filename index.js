"use strict";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiKey = process.env.API_KEY;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// All Routes
// Default
app.get("/news", async (req, res) => {
  const covidUrl = `https://newsapi.org/v2/everything?q=covid&apiKey=${apiKey}`;
  const covidResponse = await fetch(covidUrl);
  const covidData = await covidResponse.json();

  res.json(covidData);
});

// Search by specific keyword
app.get("/news/:keyword", async (req, res) => {
  const data = req.params;
  const searchUrl = `https://newsapi.org/v2/everything?q=${data.keyword}&apiKey=${apiKey}`;
  const searchResponse = await fetch(searchUrl);
  const searchData = await searchResponse.json();

  res.json(searchData);
});

// Search by relevancy
app.get("/news/relevancy/:keyword", async (req, res) => {
  const data = req.params;
  const relevancyUrl = `https://newsapi.org/v2/everything?q=${data.keyword}&sortBy=relevancy&apiKey=${apiKey}`;
  const relevancyResponse = await fetch(relevancyUrl);
  const relevancyData = await relevancyResponse.json();

  res.json(relevancyData);
});

// Search by popularity
app.get("/news/popularity/:keyword", async (req, res) => {
  const data = req.params;
  const popularityUrl = `https://newsapi.org/v2/everything?q=${data.keyword}&sortBy=popularity&apiKey=${apiKey}`;
  const popularityResponse = await fetch(popularityUrl);
  const popularityData = await popularityResponse.json();

  res.json(popularityData);
});

// Search by newest
app.get("/news/newest/:keyword", async (req, res) => {
  const data = req.params;
  const newestUrl = `https://newsapi.org/v2/everything?q=${data.keyword}&sortBy=publishedAt&apiKey=${apiKey}`;
  const newestResponse = await fetch(newestUrl);
  const newestData = await newestResponse.json();

  res.json(newestData);
});

app.listen(process.env.PORT, () => console.log("app is running"));

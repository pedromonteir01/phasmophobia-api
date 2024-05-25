require('dotenv').config();
const express = require('express');

const port = process.env.PORT;
const app = express();

app.use(express.json());
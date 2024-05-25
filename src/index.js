require('dotenv').config();
const express = require('express');
const typesRouter = require('./routes/types.routes');

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/types', typesRouter);

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
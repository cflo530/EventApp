const express = require('express');
const app = express();
require('dotenv').config();
// console.log(process.env);

const port = process.env.PORT;
const dbSetup = require('./database/setup');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const {seedAdmin} = require('./seeders/admin');

app.use(express.json());
dbSetup();
app.use(eventRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
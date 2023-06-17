const express = require('express');

const app = express();

app.listen(process.env.API_PORT, () => {
    console.log(`Listening on port ${process.env.API_PORT}`);
})
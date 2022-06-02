const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { init } = require('./index');

app.listen(PORT, () => {
    init();
});
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const { init } = require('./index');
const { arrayOfRoles } = require('./routes/apiRoutes/roleRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    init();
    // arrayOfRoles().then(array => console.log(array));
});
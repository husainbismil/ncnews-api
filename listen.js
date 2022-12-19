const app = require('./app/app.js');
const { PORT = 80 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
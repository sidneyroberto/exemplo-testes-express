const app = require('./app');

const PORTA = 3000;
app.listen(PORTA, () => console.log(`App ouvindo na porta ${PORTA}`));

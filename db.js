const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/loja-dev', { useNewUrlParser: true })
    .then(() => console.log('Mongoose conectado'))
    .catch(erro => console.log(erro));
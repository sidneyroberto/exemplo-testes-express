const { Schema, model } = require('mongoose');

const esquema = new Schema({
    descricao: {
        type: String,
        required: true
    },
    quantidadeEmEstoque: {
        type: Number,
        required: true
    },
    dataUltimoLote: {
        type: Date,
        required: true
    },
    precoUnitario: {
        type: Number,
        required: true
    }
});

const Produto = model('Produto', esquema);
module.exports = Produto;


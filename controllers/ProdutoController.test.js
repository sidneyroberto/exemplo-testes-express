const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app')
const Produto = require('../models/Produto');

describe('Testa os serviços de produtos', () => {
    beforeAll(async () => {
        await mongoose
            .connect('mongodb://localhost/loja-test', { useNewUrlParser: true })
            .then(() => console.log('Mongoose conectado para testes.'))
            .catch(erro => console.log(erro));
        await Produto.remove({});
    });

    afterAll(async () => {
        await Produto.remove({});
        await mongoose
            .disconnect()
            .then(() => console.log('Fim dos testes. Mongoose desconectado.'))
            .catch(erro => console.log(erro));
    });

    test('Deve salvar um produto no banco de dados', async () => {
        const produto = {
            descricao: 'Nintendo Switch',
            quantidadeEmEstoque: 10,
            dataUltimoLote: new Date('2019-8-2'),
            precoUnitario: 1400
        };

        const resposta = await request(app).post('/produtos').send(produto);
        expect(resposta.statusCode).toBe(201);
    });

    test('Deve atualizar um produto já existente no banco de dados', async () => {
        let produto = {
            descricao: 'PlayStation 4',
            quantidadeEmEstoque: 20,
            dataUltimoLote: new Date('2019-7-21'),
            precoUnitario: 1300
        };

        produto = await Produto.create(produto);
        produto.quantidadeEmEstoque = 9;
        resposta = await request(app).put('/produtos').send(produto);
        expect(resposta.statusCode).toBe(200);
    });

    test('Deve remover um produto do banco de dados', async () => {
        let produto = {
            descricao: 'Xbox One',
            quantidadeEmEstoque: 7,
            dataUltimoLote: new Date('2019-3-20'),
            precoUnitario: 1500
        };

        produto = await Produto.create(produto);
        resposta = await request(app).delete(`/produtos/${produto._id}`).send(produto);
        expect(resposta.statusCode).toBe(204);
    });

    test('Deve listar todos os produtos do banco de dados', async () => {
        let produtos = [
            {
                descricao: 'Xbox One',
                quantidadeEmEstoque: 7,
                dataUltimoLote: new Date('2019-3-20'),
                precoUnitario: 1500
            },
            {
                descricao: 'PlayStation 4',
                quantidadeEmEstoque: 20,
                dataUltimoLote: new Date('2019-7-21'),
                precoUnitario: 1300
            },
            {
                descricao: 'Nintendo Switch',
                quantidadeEmEstoque: 10,
                dataUltimoLote: new Date('2019-8-2'),
                precoUnitario: 1400
            }
        ];

        await Produto.remove({});
        await Produto.insertMany(produtos);
        resposta = await request(app).get('/produtos');
        expect(resposta.statusCode).toBe(200);
        const produtosRetornados = resposta.body;
        expect(produtosRetornados.length).toBe(3);
    });

});
const { Types } = require('mongoose');
const Produto = require('../models/Produto');

const controller = {
    salvar: async (req, res) => {
        const produto = req.body;

        Produto
            .create(produto)
            .then(produtoSalvo => res.status(201).json(produtoSalvo))
            .catch(erro => {
                console.log(erro);
                res.status(500).json({ erro: 'Erro ao tentar cadastrar o produto' });
            })
    },
    atualizar: (req, res) => {
        const produto = req.body;
        const id = produto._id;
        if (!id) {
            return res.status(400).json({ mensagem: 'ID do produto não informado' })
        }

        Produto
            .findByIdAndUpdate(id, produto)
            .then(produtoAtualizado => {
                if (!produtoAtualizado) {
                    return res.status(404).json({ mensagem: 'Produto não encontrado' });
                }
                res.json(produtoAtualizado);
            })
            .catch(erro => {
                console.log(erro);
                res.status(500).json({ erro: 'Erro ao tentar cadastrar o produto' });
            })
    },
    listar: async (req, res) => {
        const produtos = await Produto.find();
        res.json(produtos);
    },
    remover: (req, res) => {
        const id = req.params.id;
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ mensagem: 'ID do produto inválido' })
        }

        Produto
            .findByIdAndDelete(id)
            .then(produtoAtualizado => {
                if (!produtoAtualizado) {
                    return res.status(404).json({ mensagem: 'Produto não encontrado' });
                }
                res.status(204).end();
            })
            .catch(erro => {
                console.log(erro);
                res.status(500).json({ erro: 'Erro ao tentar cadastrar o produto' });
            })
    }
};

module.exports = controller;
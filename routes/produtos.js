const { Router } = require('express');
const ProdutoController = require('../controllers/ProdutoController');

const router = Router();

router.get('/', ProdutoController.listar);
router.post('/', ProdutoController.salvar);
router.put('/', ProdutoController.atualizar);
router.delete('/:id', ProdutoController.remover);

module.exports = router;
import { Router } from "express";
import { sanitizePedidoInput,findAll,findOne,add,update, remove } from "./pedido.controler.js";
export const pedidoRouter = Router()

pedidoRouter.get('/', findAll)
pedidoRouter.get('/:idPedido', findOne)
pedidoRouter.post('/', sanitizePedidoInput, add)
pedidoRouter.put('/:idPedido',sanitizePedidoInput ,update)
pedidoRouter.patch('/:idPedido', sanitizePedidoInput, update)
pedidoRouter.delete('/:idPedido',remove)

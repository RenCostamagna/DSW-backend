import { Request, Response, NextFunction } from "express"
import {PedidoRepository} from "./pedido.repository.js"
import { Pedido } from "./pedido.entity.js"


const repository_4 = new PedidoRepository()


function sanitizePedidoInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedEnter ={
        idPedido: req.body.idPedido,
        modalidad: req.body.modalidad,
        montoTotal: req.body.montoTotal,
        estado: req.body.estado,
        idCliente: req.body.idCliente,
    }
    next()
}

async function findAll(req:Request,res:Response){
    res.json({data: await repository_4.findAll()})
}
async function findOne(req:Request,res:Response){
    const pedido = await repository_4.findOne({id:req.params.idPedido}) 
    if(!pedido){
        res.status(404).send({message: 'pedido Not Found'})
    }
    res.json(pedido)
}

async function add(req: Request, res:Response){
    const enter= req.body.sanitizedEnter
    const pedidoEnter = new Pedido(enter.modalidad ,enter.montoTotal,enter.estado, enter.idCliente)
    const pedido = await repository_4.add(pedidoEnter)
    return res.status(201).send({message: 'PEDIDO CREADO', data: pedido})
}

async function update(req:Request,res:Response){
    req.body.sanitizedEnter.idPedido = req.params.idPedido 
    const pedido = await repository_4.update(req.params.idPedido, req.body.sanitizedEnter) ///puede ser id
    if(!pedido){
        return res.status(404).send({message: 'pedido Not Found'})
    }
    return res.status(200).send({message: 'PEDIDO MODIFICADO CORRECTAMENTE', data: pedido})
}


async function remove(req:Request,res:Response){
    const id = req.params.idPedido
    const pedido = await repository_4.delete({id})
    if(!pedido){
        res.status(404).send({message: 'PEDIDO Not Found'})
    } else{
        res.status(200).send({message: 'PEDIDO ELIMINADO CORRECTAMENTE'})
    }
}   

export {sanitizePedidoInput, findAll, findOne, add, update, remove}
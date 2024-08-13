import { Request, Response, NextFunction } from "express"
import { ClienteRepository } from "./cliente.repository.js"
import { Cliente } from "./cliente.entity.js"
const repository = new ClienteRepository

function sanitizeClienteInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedData ={
        idCliente: req.body.idCliente,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
    }
    next()
}
/*
function findAll(req:Request,res:Response){
    res.json({data: repository.findAll()})
}

function findOne(req:Request,res: Response){
    const cliente = repository.findOne({id:req.params.idCliente}) 
    if(!cliente){
        return res.status(404).send({message: 'Cliente Not Found'})
    }
    res.json(cliente)
}

function add(req: Request, res: Response){
    const data= req.body.sanitizedData
    const clienteData = new Cliente(data.idCliente,data.nombre, data.apellido,data.direccion,data.telefono)
    const cliente = repository.add(clienteData)
    return res.status(201).send({message: 'CLIENTE CREADO', data: cliente})
}  


function update(req: Request, res: Response){ ///puede ser :idCliente
    req.body.sanitizedData.idCliente = req.params.idCliente//puede ser id.Cliente idk
    const cliente = repository.update(req.body.sanitizedData)
    if(!cliente){
        return res.status(404).send({message: 'Cliente Not Found'})
    }
    return res.status(200).send({message: 'CLIENTE MODIFICADO CORRECTAMENTE', data:cliente})
}


function remove(req: Request,res: Response){
    const id = req.params.idCliente //puede ser id
    const cliente = repository.delete({id})
    if(!cliente){
        res.status(404).send({message: 'Cliente Not Found'})
    } else{
        res.status(200).send({message: 'CLIENTE ELIMINADO CORRECTAMENTE'})
    } 
}

export{sanitizeClienteInput, findAll, findOne,add, update, remove}+]*/

async function findAll(req:Request,res:Response){
    res.json({data:await repository.findAll()})
}

async function findOne(req:Request,res: Response){
    const cliente = await repository.findOne({id:req.params.idCliente}) 
    if(!cliente){
        return res.status(404).send({message: 'Cliente Not Found'})
    }
    res.json(cliente)
}

async function add(req: Request, res: Response){
    const data= req.body.sanitizedData
    const clienteData = new Cliente(data.idCliente,data.nombre, data.apellido,data.direccion,data.telefono)
    const cliente = await repository.add(clienteData)
    return res.status(201).send({message: 'CLIENTE CREADO', data: cliente})
}  


async function update(req: Request, res: Response){ 
    req.body.sanitizedData.idCliente = req.params.idCliente
    const cliente = await repository.update(req.params.idCliente, req.body.sanitizedData) ///puede ser id
    if(!cliente){
        return res.status(404).send({message: 'Cliente Not Found'})
    }
    return res.status(200).send({message: 'CLIENTE MODIFICADO CORRECTAMENTE', data:cliente})
}


async function remove(req: Request,res: Response){
    const id = req.params.idCliente //puede ser id
    const cliente =await repository.delete({id})
    if(!cliente){
        res.status(404).send({message: 'Cliente Not Found'})
    } else{
        res.status(200).send({message: 'CLIENTE ELIMINADO CORRECTAMENTE'})
    } 
}

export{sanitizeClienteInput, findAll, findOne,add, update, remove}
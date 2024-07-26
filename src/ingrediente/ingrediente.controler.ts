import { Request, Response, NextFunction } from "express"
import { IngredienteRepository } from "./ingrediente.repository.js"
import { Ingrediente } from "./ingrediente.entity.js"
const repository_3 = new IngredienteRepository


function sanitizeIngredienteInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedEnter ={
        codIngrediente: req.body.codIngrediente,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
    }
    next()
}


function findAll(req:Request,res:Response){
    res.json({data: repository_3.findAll()})
}

function findOne(req:Request,res:Response){
    const ingrediente = repository_3.findOne({id:req.params.codIngrediente}) 
    if(!ingrediente){
        res.status(404).send({message: 'ingrediente Not Found'})
    }
    res.json(ingrediente)
}

function add(req: Request, res:Response){
    const enter= req.body.sanitizedEnter
    const ingredienteEnter = new Ingrediente(enter.codIngrediente,enter.descripcion,enter.stock)
    const ingrediente = repository_3.add(ingredienteEnter)
    return res.status(201).send({message: 'INGREDIENTE CREADA', data: ingrediente})
}

function update(req:Request,res:Response){
    req.body.sanitizedEnter.codIngrediente = req.params.codIngrediente // puede ser codIngrediente
    const ingrediente = repository_3.update(req.body.sanitizedEnter) 
    if(!ingrediente){
        return res.status(404).send({message: 'ingrediente Not Found'})
    }
    
    return res.status(200).send({message: 'INGREDIENTE MODIFICADO CORRECTAMENTE', data: ingrediente})
}

function remove(req:Request,res:Response){
    const id = req.params.codIngrediente
    const ingrediente = repository_3.delete({id})
    if(!ingrediente){
        res.status(404).send({message: 'Ingredientes Not Found'})
    } else{
        res.status(200).send({message: 'INGREDIENTE ELIMINADO CORRECTAMENTE'})
    }
}

export {sanitizeIngredienteInput, findAll, findOne, add, update, remove}


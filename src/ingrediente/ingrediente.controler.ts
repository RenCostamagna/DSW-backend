import { Request, Response, NextFunction } from "express"
import { IngredienteRepository } from "./ingrediente.repository.js"
import { Ingrediente } from "./ingrediente.entity.js"


const repository_3 = new IngredienteRepository ()


function sanitizeIngredienteInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedEnter ={
        codIngrediente: req.body.codIngrediente,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
    }
    next()
}

async function findAll(req:Request,res:Response){
    res.json({data: await repository_3.findAll()})
}
async function findOne(req:Request,res:Response){
    const ingrediente = await repository_3.findOne({id:req.params.codIngrediente}) 
    if(!ingrediente){
        res.status(404).send({message: 'ingrediente Not Found'})
    }
    res.json(ingrediente)
}

async function add(req: Request, res:Response){
    const enter= req.body.sanitizedEnter
    const ingredienteEnter = new Ingrediente(enter.descripcion,enter.stock)
    const ingrediente = await repository_3.add(ingredienteEnter)
    return res.status(201).send({message: 'INGREDIENTE CREADO', data: ingrediente})
}

async function update(req:Request,res:Response){
    req.body.sanitizedEnter.codIngrediente = req.params.codIngrediente 
    const ingrediente = await repository_3.update(req.params.codIngrediente, req.body.sanitizedEnter) ///puede ser id
    if(!ingrediente){
        return res.status(404).send({message: 'ingrediente Not Found'})
    }
    
    return res.status(200).send({message: 'INGREDIENTE MODIFICADO CORRECTAMENTE', data: ingrediente})
}


async function remove(req:Request,res:Response){
    const id = req.params.codIngrediente
    const ingrediente = await repository_3.delete({id})
    if(!ingrediente){
        res.status(404).send({message: 'Ingredientes Not Found'})
    } else{
        res.status(200).send({message: 'INGREDIENTE ELIMINADO CORRECTAMENTE'})
    }
}   

export {sanitizeIngredienteInput, findAll, findOne, add, update, remove}


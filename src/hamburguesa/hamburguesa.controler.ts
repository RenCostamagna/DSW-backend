import { Request, Response, NextFunction} from "express"
import { HamburguesaRepository } from "./hamburguesa.repository.js"
import { Hamburguesa } from "./hamburguesa.entity.js"


const repository_2 = new HamburguesaRepository


function sanitizeHamburguesaInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedInput ={
        nomHamburguesa: req.body.nomHamburguesa,
        descripcion: req.body.descripcion,
    }
    next()
}

function findAll(req:Request,res:Response){
    res.json({data: repository_2.findAll()})
}

function findOne(req:Request,res: Response){
    const hamburguesa = repository_2.findOne({id:req.params.nomHamburguesa}) 
    if(!hamburguesa){
        res.status(404).send({message: 'Hamburguesa Not Found'})
    }
    res.json(hamburguesa)
}

function add(req:Request, res:Response){
    const data= req.body.sanitizedInput
    const hamburguesaInput = new Hamburguesa(data.nomHamburguesa,data.descripcion)
    const hamburguesa = repository_2.add(hamburguesaInput)
    return res.status(201).send({message: 'HAMBURGUESA CREADA', data: hamburguesa})
}

function update(req: Request,res:Response){
    req.body.sanitizedInput.nomHamburguesa = req.params.nomHamburguesa //puede ser nomHamburguesa
    const hamburguesa = repository_2.update(req.body.sanitizedInput)
    if(!hamburguesa){
        return res.status(404).send({message: 'Hamburguesa Not Found'})
    }
    return res.status(200).send({message: 'HAMBURGUESA MODIFICADA CORRECTAMENTE', data: hamburguesa})

}


function remove(req:Request,res: Response){
    const id = req.params.nomHamburguesa
    const hamburguesa = repository_2.delete({id})
    if(!hamburguesa){
        res.status(404).send({message: 'Hamburguesa Not Found'})
    } else{
        res.status(200).send({message: 'HAMBURGUESA ELIMINADA CORRECTAMENTE'})
    }  
}


export{sanitizeHamburguesaInput, findAll, findOne, add,update, remove}
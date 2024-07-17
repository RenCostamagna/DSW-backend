import express, { NextFunction, Request, Response } from 'express'
import { Hamburguesa } from './hamburguesa.js'

const app = express()
app.use(express.json())
// get(para obtener info sobre recursos) ; post(crear nuevos recursos) ; delete(borrar recursos)
// put & patch(modificar recursos)
// get/api/characters (Obtener la lista de caracteres)
// get/api/characters/:id (Obtener el character con id= :id)
// post/api/characters (Crear nuevos caracteres)
// delete /api/characters/:id (Borrar character con id = :id)
//put & patch/api/characters/:id (Modificar character con id =:id)


const hamburguesas: Hamburguesa[] = [
    new Hamburguesa(
        'INIA',
        'REN',
    ),
]

function sanitizeHamburguesaInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedInput ={
        nomHamburguesa: req.body.nomHamburguesa,
        descripcion: req.body.descripcion,
    }
    next()
}



app.get('/api/hamburguesas', (req,res)=>{
    res.json(hamburguesas)
})

app.get('/api/hamburguesas/:nomHamburguesa', (req,res)=>{
    const hamburguesa = hamburguesas.find((hamburguesa) => hamburguesa.nomHamburguesa === req.params.nomHamburguesa) ///para que recupere el personaje con el q coincide el id
    if(!hamburguesa){
        res.status(404).send({message: 'Hamburguesa Not Found'})
    }
    res.json(hamburguesa)
})

app.post('/api/hamburguesas',sanitizeHamburguesaInput, (req, res) => {
    const data= req.body.sanitizedInput
    const hamburguesa = new Hamburguesa(data.nomHamburguesa,data.descripcion)
    hamburguesas.push(hamburguesa)
    res.status(201).send({message: 'HAMBURGUESA CREADA', data: hamburguesa})
})

app.put('/api/hamburguesas/:nomHamburguesa',sanitizeHamburguesaInput, (req,res)=>{
    const hamburguesaIdx = hamburguesas.findIndex((hamburguesa) => hamburguesa.nomHamburguesa === req.params.nomHamburguesa) ///para que recupere el personaje con el q coincide el id
    if(hamburguesaIdx===-1){
        res.status(404).send({message: 'Hamburguesa Not Found'})
    }

    hamburguesas[hamburguesaIdx] = { ...hamburguesas[hamburguesaIdx], ...req.body.sanitizedInput}
    res.status(200).send({message: 'HAMBURGUESA MODIFICADA CORRECTAMENTE', data: hamburguesas[hamburguesaIdx]})

       
})

app.delete('/api/hamburguesas/:nomHamburguesa', (req,res)=>{
    const hamburguesaIdx = hamburguesas.findIndex((hamburguesa) => hamburguesa.nomHamburguesa === req.params.nomHamburguesa)
    if(hamburguesaIdx===-1){
        res.status(404).send({message: 'Hamburguesa Not Found'})
    }
    hamburguesas.splice(hamburguesaIdx,1)
    res.status(200).send({message: 'HAMBURGUESA ELIMINADA CORRECTAMENTE'})
})

app.listen(3000,() =>{
    console.log('Server is running on http://localhost:3000/')
})
import express, { NextFunction, Request, Response } from 'express'
import { Hamburguesa } from './hamburguesa.js'
import { Cliente} from './cliente.js'
import { Ingrediente} from './ingrediente.js'
const app = express()
app.use(express.json())
// get(para obtener info sobre recursos) ; post(crear nuevos recursos) ; delete(borrar recursos)
// put & patch(modificar recursos)
// get/api/characters (Obtener la lista de caracteres)
// get/api/characters/:id (Obtener el character con id= :id)
// post/api/characters (Crear nuevos caracteres)
// delete /api/characters/:id (Borrar character con id = :id)
//put & patch/api/characters/:id (Modificar character con id =:id)

const ingredientes: Ingrediente[] = [
    new Ingrediente(
        '1',
        'pepino',
        0,
    ),
]

const hamburguesas: Hamburguesa[] = [
    new Hamburguesa(
        'INIA',
        'REN',
    ),
]
const clientes: Cliente[] = [
    new Cliente(
        'UNO',
        'INIAKI',
        'DIAZ',
        'ASSDD',
        '1345',
    ),
]

function sanitizeIngredienteInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedEnter ={
        codIngrediente: req.body.codIngrediente,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
    }
    next()
}

function sanitizeHamburguesaInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedInput ={
        nomHamburguesa: req.body.nomHamburguesa,
        descripcion: req.body.descripcion,
    }
    next()
}

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

app.get('/api/ingredientes', (req,res)=>{
    res.json(ingredientes)
})

app.get('/api/clientes', (req,res)=>{
    res.json(clientes)
})

app.get('/api/hamburguesas', (req,res)=>{
    res.json(hamburguesas)
})


app.get('/api/ingredientes/:codIngrediente', (req,res)=>{
    const ingrediente = ingredientes.find((ingrediente) => ingrediente.codIngrediente === req.params.codIngrediente) ///para que recupere el personaje con el q coincide el id
    if(!ingrediente){
        res.status(404).send({message: 'ingrediente Not Found'})
    }
    res.json(ingrediente)
})

app.get('/api/clientes/:idCliente', (req,res)=>{
    const cliente = clientes.find((cliente) => cliente.idCliente === req.params.idCliente) 
    if(!cliente){
        res.status(404).send({message: 'Cliente Not Found'})
    }
    res.json(cliente)
})


app.get('/api/hamburguesas/:nomHamburguesa', (req,res)=>{
    const hamburguesa = hamburguesas.find((hamburguesa) => hamburguesa.nomHamburguesa === req.params.nomHamburguesa) 
    if(!hamburguesa){
        res.status(404).send({message: 'Hamburguesa Not Found'})
    }
    res.json(hamburguesa)
})

app.post('/api/clientes',sanitizeClienteInput, (req, res) => {
    const data= req.body.sanitizedData
    const cliente = new Cliente(data.idCliente,data.nombre, data.apellido,data.direccion,data.telefono)
    clientes.push(cliente)
    res.status(201).send({message: 'CLIENTE CREADO', data: cliente})
})


app.post('/api/hamburguesas',sanitizeHamburguesaInput, (req, res) => {
    const data= req.body.sanitizedInput
    const hamburguesa = new Hamburguesa(data.nomHamburguesa,data.descripcion)
    hamburguesas.push(hamburguesa)
    res.status(201).send({message: 'HAMBURGUESA CREADA', data: hamburguesa})
})

app.post('/api/ingredientes',sanitizeIngredienteInput, (req, res) => {
    const enter= req.body.sanitizedEnter
    const ingrediente = new Ingrediente(enter.codIngrediente,enter.descripcion,enter.stock)
    ingredientes.push(ingrediente)
    res.status(201).send({message: 'INGREDIENTE CREADA', data: ingrediente})
})



app.put('/api/clientes/:idCliente',sanitizeClienteInput, (req,res)=>{
    const clienteIdx = clientes.findIndex((cliente) => cliente.idCliente === req.params.idCliente) ///para que recupere el personaje con el q coincide el id
    if(clienteIdx===-1){
        res.status(404).send({message: 'Cliente Not Found'})
    }
    clientes[clienteIdx] = { ...clientes[clienteIdx], ...req.body.sanitizedData}
    res.status(200).send({message: 'CLIENTE MODIFICADO CORRECTAMENTE', data: clientes[clienteIdx]})
})


app.put('/api/hamburguesas/:nomHamburguesa',sanitizeHamburguesaInput, (req,res)=>{
    const hamburguesaIdx = hamburguesas.findIndex((hamburguesa) => hamburguesa.nomHamburguesa === req.params.nomHamburguesa) ///para que recupere el personaje con el q coincide el id
    if(hamburguesaIdx===-1){
        res.status(404).send({message: 'Hamburguesa Not Found'})
    }

    hamburguesas[hamburguesaIdx] = { ...hamburguesas[hamburguesaIdx], ...req.body.sanitizedInput}
    res.status(200).send({message: 'HAMBURGUESA MODIFICADA CORRECTAMENTE', data: hamburguesas[hamburguesaIdx]})

       
})

app.put('/api/ingredientes/:codIngrediente',sanitizeIngredienteInput, (req,res)=>{
    const ingredienteIdx = ingredientes.findIndex((ingrediente) => ingrediente.codIngrediente === req.params.codIngrediente) ///para que recupere el personaje con el q coincide el id
    if(ingredienteIdx===-1){
        res.status(404).send({message: 'ingrediente Not Found'})
    }

    ingredientes[ingredienteIdx] = { ...ingredientes[ingredienteIdx], ...req.body.sanitizedEnter}
    res.status(200).send({message: 'INGREDIENTE MODIFICADO CORRECTAMENTE', data: ingredientes[ingredienteIdx]})

       
})
app.delete('/api/hamburguesas/:nomHamburguesa', (req,res)=>{
    const hamburguesaIdx = hamburguesas.findIndex((hamburguesa) => hamburguesa.nomHamburguesa === req.params.nomHamburguesa)
    if(hamburguesaIdx===-1){
        res.status(404).send({message: 'Hamburguesa Not Found'})
    }
    hamburguesas.splice(hamburguesaIdx,1)
    res.status(200).send({message: 'HAMBURGUESA ELIMINADA CORRECTAMENTE'})
})

app.delete('/api/clientes/:idCliente', (req,res)=>{
    const clienteIdx = clientes.findIndex((cliente) => cliente.idCliente === req.params.idCliente)
    if(clienteIdx===-1){
        res.status(404).send({message: 'Cliente Not Found'})
    }
    clientes.splice(clienteIdx,1)
    res.status(200).send({message: 'CLIENTE ELIMINADO CORRECTAMENTE'})
})

app.delete('/api/ingredientes/:codIngrediente', (req,res)=>{
    const ingredienteIdx = ingredientes.findIndex((ingrediente) => ingrediente.codIngrediente === req.params.codIngrediente)
    if(ingredienteIdx===-1){
        res.status(404).send({message: 'Ingredientes Not Found'})
    }
    ingredientes.splice(ingredienteIdx,1)
    res.status(200).send({message: 'INGREDIENTE ELIMINADO CORRECTAMENTE'})
})


app.listen(3000,() =>{
    console.log('Server is running on http://localhost:3000/')
})
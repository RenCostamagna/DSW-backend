import express, { NextFunction, Request, Response } from 'express'
import { Hamburguesa } from './hamburguesa.js'
import { Cliente} from './cliente.js'

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
const clientes: Cliente[] = [
    new Cliente(
        'UNO',
        'INIAKI',
        'DIAZ',
        'ASSDD',
        '1345',
    ),
]


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

app.get('/api/clientes', (req,res)=>{
    res.json(clientes)
})

app.get('/api/hamburguesas', (req,res)=>{
    res.json(hamburguesas)
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

app.listen(3000,() =>{
    console.log('Server is running on http://localhost:3000/')
})
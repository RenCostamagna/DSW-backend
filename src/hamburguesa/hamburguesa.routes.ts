import { Router } from "express";
import { sanitizeHamburguesaInput,findAll,findOne,add,update, remove } from "./hamburguesa.controler.js";

export const hamburguesaRouter = Router()

hamburguesaRouter.get('/', findAll)
hamburguesaRouter.get('/:idHamburguesa', findOne)
hamburguesaRouter.post('/', sanitizeHamburguesaInput, add)
hamburguesaRouter.put('/:idHamburguesa', sanitizeHamburguesaInput,update)
hamburguesaRouter.patch('/:idHamburguesa', sanitizeHamburguesaInput, update)
hamburguesaRouter.delete('/:idHamburguesa',remove)


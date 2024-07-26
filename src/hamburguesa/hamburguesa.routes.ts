import { Router } from "express";
import { sanitizeHamburguesaInput,findAll,findOne,add,update, remove } from "./hamburguesa.controler.js";

export const hamburguesaRouter = Router()

hamburguesaRouter.get('/', findAll)
hamburguesaRouter.get('/:nomHamburguesa', findOne)
hamburguesaRouter.post('/', sanitizeHamburguesaInput, add)
hamburguesaRouter.put('/:nomHamburguesa', sanitizeHamburguesaInput,update)
hamburguesaRouter.patch('/:nomHamburguesa', sanitizeHamburguesaInput, update)
hamburguesaRouter.delete('/:nomHamburguesa',remove)


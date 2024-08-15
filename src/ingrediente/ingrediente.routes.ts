import { Router } from "express"
import { sanitizeIngredienteInput,findAll,findOne,add,update,remove } from "./ingrediente.controler.js"

export const ingredienteRouter = Router()

ingredienteRouter.get('/', findAll)
ingredienteRouter.get('/:codIngrediente', findOne)
ingredienteRouter.post('/', sanitizeIngredienteInput, add)
ingredienteRouter.put('/:codIngrediente', sanitizeIngredienteInput,update)
ingredienteRouter.patch('/:codIngrediente', sanitizeIngredienteInput, update)
ingredienteRouter.delete('/:codIngrediente',remove) 


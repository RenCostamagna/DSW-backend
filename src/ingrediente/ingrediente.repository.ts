import { Repository } from "../shared/repository.js";
import { Ingrediente } from "./ingrediente.entity.js";



const ingredientes: Ingrediente[] = [
    new Ingrediente(
        '1',
        'pepino',
        3,
    ),
]

export class IngredienteRepository implements Repository<Ingrediente>{
    public findAll(): Ingrediente[] | undefined {
        return ingredientes
    }
    public findOne(item: { id: string; }): Ingrediente | undefined {
        return ingredientes.find((ingrediente) => ingrediente.codIngrediente === item.id)
    }
    public add(item: Ingrediente): Ingrediente | undefined {
        ingredientes.push(item)
        return(item)
    }
    public update(item: Ingrediente): Ingrediente | undefined {
        const ingredientesIdx = ingredientes.findIndex((ingrediente) => ingrediente.codIngrediente === item.codIngrediente) 
        if(ingredientesIdx !==-1){
            ingredientes[ingredientesIdx] = { ...ingredientes[ingredientesIdx], ...item}
        }
        return ingredientes[ingredientesIdx]
    }
    public delete(item: { id: string; }): Ingrediente | undefined {
        const ingredientesIdx = ingredientes.findIndex((ingrediente) => ingrediente.codIngrediente === item.id)
        if(ingredientesIdx !==-1){
            const deletedHamburguesas= ingredientes[ingredientesIdx]
            ingredientes.splice(ingredientesIdx,1)
            return deletedHamburguesas
        }
    }


}
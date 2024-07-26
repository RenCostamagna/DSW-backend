import { Repository } from "../shared/repository.js";
import { Hamburguesa } from "./hamburguesa.entity.js";



const hamburguesas: Hamburguesa[] = [
    new Hamburguesa(
        'INIA',
        'REN',
    ),
]

export class HamburguesaRepository implements Repository<Hamburguesa>{
    public findAll(): Hamburguesa[] | undefined {
        return hamburguesas
    }
    public findOne(item: { id: string; }): Hamburguesa | undefined {
        return hamburguesas.find((hamburguesa) => hamburguesa.nomHamburguesa === item.id)
    }
    public add(item: Hamburguesa): Hamburguesa | undefined {
        hamburguesas.push(item)
        return(item)
    }
    public update(item: Hamburguesa): Hamburguesa | undefined {
        const hamburguesaIdx = hamburguesas.findIndex((hamburguesa) => hamburguesa.nomHamburguesa === item.nomHamburguesa) 
        if(hamburguesaIdx !==-1){
            hamburguesas[hamburguesaIdx] = { ...hamburguesas[hamburguesaIdx], ...item}
        }
        return hamburguesas[hamburguesaIdx]
    }
    public delete(item: { id: string; }): Hamburguesa | undefined {
        const hamburguesaIdx = hamburguesas.findIndex((hamburguesa) => hamburguesa.nomHamburguesa === item.id)
        if(hamburguesaIdx !==-1){
            const deletedHamburguesas= hamburguesas[hamburguesaIdx]
            hamburguesas.splice(hamburguesaIdx,1)
            return deletedHamburguesas
        }
    }

}
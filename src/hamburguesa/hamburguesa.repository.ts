import { Repository } from "../shared/repository.js";
import { Hamburguesa } from "./hamburguesa.entity.js";
import { pool } from "../shared/db/conn.mysql.js";


const hamburguesas: Hamburguesa[] = [
    new Hamburguesa(
        'INIA',
        'REN',
    ),
]

export class HamburguesaRepository implements Repository<Hamburguesa>{
    public async findAll(): Promise<Hamburguesa[] | undefined> {
        const [hamburguesas] = await pool.query('select * from hamburguesas')
        return hamburguesas as Hamburguesa[]
    }
    public async findOne(item: { id: string }): Promise<Hamburguesa | undefined> {
        const id = Number.parseInt(item.id)
        
        if(hamburguesas.length === 0){
            return undefined
        }
        const hamburguesa = hamburguesas[0] as Hamburguesa
        return hamburguesa
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
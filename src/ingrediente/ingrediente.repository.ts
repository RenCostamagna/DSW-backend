import { Repository } from "../shared/repository.js";
import { Ingrediente } from "./ingrediente.entity.js";
import { pool } from "../shared/db/conn.mysql.js";
import { RowDataPacket } from "mysql2";


const ingredientes: Ingrediente[] = [
    new Ingrediente(
        'assss',
        2,
        1,
    )
]

export class IngredienteRepository implements Repository<Ingrediente> {
    public async findAll(): Promise< Ingrediente[]| undefined>  {
        const [ingredientes] = await pool.query('select * from ingredientes')
        return ingredientes as Ingrediente[]  
        /*falta el for que se usa en el video api23 VER COMO DEBERIAMOS USARLO NOSTROS
        for (const character of characters as Character[]) {
            const [items] = await pool.query('select itemName from characterItems where characterId = ?', [character.id])
            character   .items = (items as { itemName: string }[]).map((item) => item.itemName) */
    }
    public async findOne(item: { id: string }): Promise< Ingrediente | undefined> {
        const id = Number.parseInt(item.id)
        const [ingredientes] = await pool.query<RowDataPacket[]>('select * from ingredientes where codIngrediente = ?', [id])
        if(ingredientes.length === 0){
            return undefined
        }
        const ingrediente = ingredientes[0] as Ingrediente
        return ingrediente
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
        const ingredientesIdx = -1
        if(ingredientesIdx !==-1){
            const deletedHamburguesas= ingredientes[ingredientesIdx]
            ingredientes.splice(ingredientesIdx,1)
            return deletedHamburguesas
        }
    }


}
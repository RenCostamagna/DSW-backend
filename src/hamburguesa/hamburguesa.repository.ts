import { Repository } from "../shared/repository.js";
import { Hamburguesa } from "./hamburguesa.entity.js";
import { pool } from "../shared/db/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const hamburguesas: Hamburguesa[] = [
    new Hamburguesa(
        'b',
        'a',
        20
    ),
]

export class HamburguesaRepository implements Repository<Hamburguesa>{
    public async findAll(): Promise<Hamburguesa[] | undefined> {
        const [hamburguesas] = await pool.query('select * from hamburguesas')
        return hamburguesas as Hamburguesa[]
    }
    public async findOne(item: { id:string  }): Promise< Hamburguesa | undefined> {
        const id = Number.parseInt(item.id)
        const [hamburguesas] = await pool.query<RowDataPacket[]>('select * from hamburguesas where idHamburguesa = ?', [id])
        if(hamburguesas.length === 0){
            return undefined
        }
        const hamburguesa = hamburguesas[0] as Hamburguesa
        return hamburguesa
    }
    public async add(HamburguesaInput: Hamburguesa): Promise<Hamburguesa | undefined> {
        const {idHamburguesa,...HamburguesaRow}=HamburguesaInput
        const [result]=await pool.query<ResultSetHeader> ('INSERT INTO hamburguesas SET ?', [HamburguesaRow])
        HamburguesaInput.idHamburguesa=result.insertId
        
        return HamburguesaInput;
    }
    public async update(id:string, hamburguesaInput:Hamburguesa): Promise<Hamburguesa | undefined> {
        const hamburguesaId= Number.parseInt(id)
        const {idHamburguesa, ...hamburguesaRow} = hamburguesaInput
        await pool.query ('update hamburguesas set? where idHamburguesa =?', [hamburguesaRow, hamburguesaId])
        return await this.findOne({id})
 
    }
    public async delete(item: { id: string; }): Promise<Hamburguesa | undefined>{
        try{
            const hamburguesaToDelete= await this.findOne(item)
            const hamburguesaId= Number.parseInt(item.id)
            await pool.query('delete from hamburguesas where idHamburguesa =?', hamburguesaId)
            return hamburguesaToDelete
        } catch(error: any) {
            throw new Error('unable to delete Hamburguesa')
        }

    }

}
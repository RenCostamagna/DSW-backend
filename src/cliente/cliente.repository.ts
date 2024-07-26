import { Repository } from "../shared/repository.js";
import { Cliente } from "./cliente.entity.js";

const clientes: Cliente[] = [
    new Cliente(
        'UNO',
        'INIAKI',
        'DIAZ',
        'ASSDD',
        '1345',
    ),
]
export class ClienteRepository implements Repository<Cliente>{
    public findAll(): Cliente[] | undefined {
        return clientes
    }
    public findOne(item: { id: string; }): Cliente | undefined {
        return clientes.find((cliente) => cliente.idCliente === item.id)
    }
    public add(item: Cliente): Cliente | undefined {
        clientes.push(item)
        return(item)
    }
    public update(item: Cliente): Cliente | undefined {
        const clienteIdx = clientes.findIndex((cliente) => cliente.idCliente === item.idCliente) 
        if(clienteIdx !== -1){
            clientes[clienteIdx] = { ...clientes[clienteIdx], ...item}
        }
        return clientes[clienteIdx]
    }
    public delete(item: { id: string; }): Cliente | undefined {
        const clienteIdx = clientes.findIndex((cliente) => cliente.idCliente === item.id)
        if(clienteIdx !==-1){
            const deletedClientes = clientes[clienteIdx]
            clientes.splice(clienteIdx, 1)
            return deletedClientes
        }
    }
}   
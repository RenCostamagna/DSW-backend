export interface Repository<T>{
    findAll(): Promise<T[] | undefined>
    findOne(item: { id: string }): Promise<T | undefined>
    add(item:T): T | undefined
    update( item: T): T | undefined
    delete(item:{id:string}): T | undefined
}

/*
export interface Repository<T> {
    findAll(): Promise<T[] | undefined>
    findOne(item: { id: string }): Promise<T | undefined>
    add(item: T): Promise<T | undefined>
    update(id: string, item: T): Promise<T | undefined>
    delete(item: { id: string }): Promise<T | undefined>
  }
    */
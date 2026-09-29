import { Repository } from 'typeorm';
import { CreateEmprendedorDto } from './dto/create-emprendedor.dto';
import { UpdateEmprendedorDto } from './dto/update-emprendedor.dto';
import { Emprendedor } from './entities/emprendedor.entity';
export declare class EmprendedoresService {
    private repo;
    constructor(repo: Repository<Emprendedor>);
    findAll(): Promise<Emprendedor[]>;
    findOne(id: number): Promise<Emprendedor>;
    create(dto: CreateEmprendedorDto): Promise<Emprendedor>;
    update(id: number, dto: UpdateEmprendedorDto): Promise<Emprendedor>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
    buscar(comuna?: string, rubro?: string): Promise<Emprendedor[]>;
}

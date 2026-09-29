import { CreateEmprendedorDto } from './dto/create-emprendedor.dto';
import { UpdateEmprendedorDto } from './dto/update-emprendedor.dto';
import { EmprendedoresService } from './emprendedores.service';
export declare class EmprendedoresController {
    private readonly service;
    constructor(service: EmprendedoresService);
    findAll(): Promise<import("./entities/emprendedor.entity").Emprendedor[]>;
    buscar(comuna?: string, rubro?: string): Promise<import("./entities/emprendedor.entity").Emprendedor[]>;
    findOne(id: string): Promise<import("./entities/emprendedor.entity").Emprendedor>;
    create(dto: CreateEmprendedorDto): Promise<import("./entities/emprendedor.entity").Emprendedor>;
    update(id: string, dto: UpdateEmprendedorDto): Promise<import("./entities/emprendedor.entity").Emprendedor>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}

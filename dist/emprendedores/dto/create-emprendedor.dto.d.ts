export declare const RUBROS: readonly ["Apicultura", "Lácteos", "Textiles", "Turismo", "Artesanía", "Agricultura"];
export type Rubro = typeof RUBROS[number];
export declare class CreateEmprendedorDto {
    nombre: string;
    comuna: string;
    rubro: Rubro;
    descripcion: string;
    contacto: string;
}

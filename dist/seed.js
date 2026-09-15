"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
const emprendedor_entity_1 = require("./emprendedores/entities/emprendedor.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const ds = app.get(typeorm_1.DataSource);
    const repo = ds.getRepository(emprendedor_entity_1.Emprendedor);
    const base = [
        { nombre: 'Catedral Gifts', comuna: 'Chillán', rubro: 'Artesanía', descripcion: 'Souvenirs inspirados en la catedral.', contacto: 'catedral@negocio.cl' },
        { nombre: 'Miel Las Trancas', comuna: 'Pinto', rubro: 'Apicultura', descripcion: 'Miel de montaña 100% natural.', contacto: '+56 9 1234 5678' },
        { nombre: 'Quesos San Carlos', comuna: 'San Carlos', rubro: 'Lácteos', descripcion: 'Quesos artesanales madurados.', contacto: 'ventas@quesossancarlos.cl' }
    ];
    await repo.save(base);
    console.log('Datos de ejemplo insertados');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map
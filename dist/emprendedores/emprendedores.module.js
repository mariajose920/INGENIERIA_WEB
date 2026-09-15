"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprendedoresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const emprendedores_controller_1 = require("./emprendedores.controller");
const emprendedores_service_1 = require("./emprendedores.service");
const emprendedor_entity_1 = require("./entities/emprendedor.entity");
let EmprendedoresModule = class EmprendedoresModule {
};
exports.EmprendedoresModule = EmprendedoresModule;
exports.EmprendedoresModule = EmprendedoresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([emprendedor_entity_1.Emprendedor])],
        controllers: [emprendedores_controller_1.EmprendedoresController],
        providers: [emprendedores_service_1.EmprendedoresService],
    })
], EmprendedoresModule);
//# sourceMappingURL=emprendedores.module.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmprendedorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_emprendedor_dto_1 = require("./create-emprendedor.dto");
class UpdateEmprendedorDto extends (0, swagger_1.PartialType)(create_emprendedor_dto_1.CreateEmprendedorDto) {
}
exports.UpdateEmprendedorDto = UpdateEmprendedorDto;
//# sourceMappingURL=update-emprendedor.dto.js.map
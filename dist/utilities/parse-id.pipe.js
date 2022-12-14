"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseIdPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let ParseIdPipe = class ParseIdPipe {
    transform(value) {
        const validId = mongoose_1.default.isObjectIdOrHexString(value);
        if (!validId) {
            throw new common_1.BadRequestException({ message: 'ID de mongo inválido' });
        }
        return value;
    }
};
ParseIdPipe = __decorate([
    (0, common_1.Injectable)()
], ParseIdPipe);
exports.ParseIdPipe = ParseIdPipe;
//# sourceMappingURL=parse-id.pipe.js.map
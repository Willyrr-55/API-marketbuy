"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
let CloudinaryService = class CloudinaryService {
    async uploadImage(file) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream((error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            this.convert(file.buffer).pipe(upload);
        });
    }
    convert(buf, chunkSize) {
        if (typeof buf === 'string') {
            buf = Buffer.from(buf, 'utf8');
        }
        if (!Buffer.isBuffer(buf)) {
            throw new TypeError(`"buf" argument must be a string or an instance of Buffer`);
        }
        const reader = new stream_1.Readable();
        const hwm = reader._readableState.highWaterMark;
        if (!chunkSize || typeof chunkSize !== 'number' || chunkSize < 1 || chunkSize > hwm) {
            chunkSize = hwm;
        }
        const len = buf.length;
        let start = 0;
        reader._read = function () {
            while (reader.push(buf.slice(start, (start += chunkSize)))) {
                if (start >= len) {
                    reader.push(null);
                    break;
                }
            }
        };
        return reader;
    }
};
CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map
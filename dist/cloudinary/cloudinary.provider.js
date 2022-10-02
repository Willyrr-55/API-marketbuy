"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const constants_1 = require("../constants");
exports.CloudinaryProvider = {
    provide: constants_1.CLOUDINARY,
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'duks0nn9o',
            api_key: '816361837366996',
            api_secret: '-zmyNOxA1JiK7H653tt_sfnh-Hk'
        });
    }
};
//# sourceMappingURL=cloudinary.provider.js.map
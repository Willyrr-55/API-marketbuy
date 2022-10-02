"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseFormDataJsonPipe = void 0;
const deep_parse_json_1 = require("deep-parse-json");
const _ = require("lodash");
class ParseFormDataJsonPipe {
    constructor(options) {
        this.options = options;
    }
    transform(value, _metadata) {
        const { except } = this.options;
        const serializedValue = value;
        const originProperties = {};
        if (except === null || except === void 0 ? void 0 : except.length) {
            _.merge(originProperties, _.pick(serializedValue, ...except));
        }
        const deserializedValue = (0, deep_parse_json_1.deepParseJson)(value);
        return Object.assign(Object.assign({}, deserializedValue), originProperties);
    }
}
exports.ParseFormDataJsonPipe = ParseFormDataJsonPipe;
//# sourceMappingURL=parse-form-data-json.pipe.js.map
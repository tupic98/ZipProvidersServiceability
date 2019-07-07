"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class ZipNotFoundException extends HttpException_1.default {
    constructor(zip) {
        super(404, `Zip ${zip} not found`);
    }
}
exports.default = ZipNotFoundException;
//# sourceMappingURL=ZipNotFoundException.js.map
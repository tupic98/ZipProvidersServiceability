"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const ormconfig_1 = __importDefault(require("./ormconfig"));
const main_controller_1 = __importDefault(require("./controllers/main.controller"));
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        const connection = yield typeorm_1.createConnection(ormconfig_1.default);
        yield connection.runMigrations();
    }
    catch (e) {
        console.log('Error while connecting to the database', e);
        return e;
    }
    const app = new app_1.default([
        new main_controller_1.default(),
    ]);
    app.listen();
}))();
//# sourceMappingURL=server.js.map
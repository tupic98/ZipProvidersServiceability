"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_entity_1 = __importDefault(require("./address.entity"));
const typeorm_1 = require("typeorm");
const providers_entity_1 = __importDefault(require("./providers.entity"));
let Address_providers = class Address_providers {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Address_providers.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => address_entity_1.default, address => address.address_providers, {
        eager: true,
    }),
    __metadata("design:type", address_entity_1.default)
], Address_providers.prototype, "address", void 0);
__decorate([
    typeorm_1.ManyToOne(() => providers_entity_1.default, providers => providers.address_providers, {
        eager: true,
    }),
    __metadata("design:type", providers_entity_1.default)
], Address_providers.prototype, "provider", void 0);
Address_providers = __decorate([
    typeorm_1.Entity({
        name: "address_providers",
        schema: "public",
    })
], Address_providers);
exports.default = Address_providers;
//# sourceMappingURL=address_provider.entity.js.map
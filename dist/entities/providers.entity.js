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
const typeorm_1 = require("typeorm");
const categories_entity_1 = __importDefault(require("./categories.entity"));
const address_provider_entity_1 = __importDefault(require("./address_provider.entity"));
let Providers = class Providers {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Providers.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Providers.prototype, "providerName", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Providers.prototype, "providerId", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Providers.prototype, "companyId", void 0);
__decorate([
    typeorm_1.Column({
        type: "int",
        nullable: true,
    }),
    __metadata("design:type", Number)
], Providers.prototype, "partnerId", void 0);
__decorate([
    typeorm_1.Column({
        type: 'real',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Providers.prototype, "serviceable", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Providers.prototype, "datacount", void 0);
__decorate([
    typeorm_1.OneToMany(() => address_provider_entity_1.default, address_providers => address_providers.provider),
    __metadata("design:type", Array)
], Providers.prototype, "address_providers", void 0);
__decorate([
    typeorm_1.OneToMany(() => categories_entity_1.default, categories => categories.provider),
    __metadata("design:type", Array)
], Providers.prototype, "categories", void 0);
Providers = __decorate([
    typeorm_1.Entity()
], Providers);
exports.default = Providers;
// Serial -> address
// Categories
// details
// technologies
//# sourceMappingURL=providers.entity.js.map
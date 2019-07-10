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
const detailsCategory_entity_1 = __importDefault(require("./detailsCategory.entity"));
const details_entity_1 = __importDefault(require("./details.entity"));
const technologies_entity_1 = __importDefault(require("./technologies.entity"));
const providers_entity_1 = __importDefault(require("./providers.entity"));
let Categories = class Categories {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Categories.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => detailsCategory_entity_1.default, detailsCategory => detailsCategory.categories, {
        eager: true,
    }),
    __metadata("design:type", detailsCategory_entity_1.default)
], Categories.prototype, "categoryName", void 0);
__decorate([
    typeorm_1.Column({
        type: 'real',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Categories.prototype, "serviceable", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Categories.prototype, "datacount", void 0);
__decorate([
    typeorm_1.ManyToOne(() => providers_entity_1.default, providers => providers.categories, {
        eager: true,
    }),
    __metadata("design:type", providers_entity_1.default)
], Categories.prototype, "provider", void 0);
__decorate([
    typeorm_1.ManyToOne(() => details_entity_1.default, details => details.categories, {
        eager: true,
    }),
    __metadata("design:type", details_entity_1.default)
], Categories.prototype, "details", void 0);
__decorate([
    typeorm_1.OneToMany(() => technologies_entity_1.default, technologies => technologies.category),
    __metadata("design:type", Array)
], Categories.prototype, "technologies", void 0);
Categories = __decorate([
    typeorm_1.Entity()
], Categories);
exports.default = Categories;
//# sourceMappingURL=categories.entity.js.map
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
const technologies_entity_1 = __importDefault(require("./technologies.entity"));
const categories_entity_1 = __importDefault(require("./categories.entity"));
let Details = class Details {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Details.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => detailsCategory_entity_1.default, detailsCategory => detailsCategory.details, {
        eager: true,
    }),
    __metadata("design:type", detailsCategory_entity_1.default)
], Details.prototype, "detailsCategory", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Details.prototype, "minPrice", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Details.prototype, "maxDownloadSpeed", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Details.prototype, "maxDownloadSpeedUnit", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Details.prototype, "minDownloadSpeed", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Details.prototype, "minDownloadSpeedUnit", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Details.prototype, "minChannels", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Details.prototype, "maxChannels", void 0);
__decorate([
    typeorm_1.OneToMany(() => categories_entity_1.default, categories => categories.details),
    __metadata("design:type", Array)
], Details.prototype, "categories", void 0);
__decorate([
    typeorm_1.OneToMany(() => technologies_entity_1.default, technologies => technologies.details),
    __metadata("design:type", Array)
], Details.prototype, "technologies", void 0);
Details = __decorate([
    typeorm_1.Entity({
        name: "details",
        schema: "public",
    })
], Details);
exports.default = Details;
//# sourceMappingURL=details.entity.js.map
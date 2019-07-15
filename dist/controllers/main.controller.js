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
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const address_entity_1 = __importDefault(require("../entities/address.entity"));
const axios_1 = __importDefault(require("axios"));
const ZipNotFoundException_1 = __importDefault(require("../exceptions/ZipNotFoundException"));
const categories_entity_1 = __importDefault(require("../entities/categories.entity"));
const detailsCategory_entity_1 = __importDefault(require("../entities/detailsCategory.entity"));
const details_entity_1 = __importDefault(require("../entities/details.entity"));
const technologies_entity_1 = __importDefault(require("../entities/technologies.entity"));
const address_provider_entity_1 = __importDefault(require("../entities/address_provider.entity"));
const providers_entity_1 = __importDefault(require("../entities/providers.entity"));
class MainController {
    constructor() {
        this.path = '/fetch';
        this.router = express_1.default.Router();
        this.addressRepository = typeorm_1.getRepository(address_entity_1.default);
        this.detailsCategoryRepository = typeorm_1.getRepository(detailsCategory_entity_1.default);
        this.providersRepository = typeorm_1.getRepository(providers_entity_1.default);
        this.categoriesRepository = typeorm_1.getRepository(categories_entity_1.default);
        this.detailsRepository = typeorm_1.getRepository(details_entity_1.default);
        this.technologiesRepository = typeorm_1.getRepository(technologies_entity_1.default);
        this.addressProviderRepository = typeorm_1.getRepository(address_provider_entity_1.default);
        this.getAllServicesByZip = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const zip = req.params.zip;
            let allServices;
            try {
                allServices = yield typeorm_1.createQueryBuilder('address')
                    .innerJoin('address_providers', 'ap', 'a.id = ap."addressId"')
                    .innerJoinAndSelect('providers', 'p', 'ap."providerId" = p.id')
                    .where('a.zip = :zip', { zip: zip })
                    .getQuery();
                yield typeorm_1.createQueryBuilder('address')
                    .innerJoin('')
                    .
                ;
            }
            catch (e) {
                throw new Error(e);
            }
            if (!allServices) {
                yield axios_1.default.post('https://predict.harbinger.redventures.io/serviceability/projected/zip', {
                    zip: zip,
                }).then((response) => __awaiter(this, void 0, void 0, function* () {
                    this.insertNewData(response.data, zip).catch();
                    res.status(200).send(() => __awaiter(this, void 0, void 0, function* () {
                        return yield this.addressRepository.findOne({
                            where: { zip: zip },
                        }).catch();
                    }));
                })).catch(() => {
                    res.status(404).send(new ZipNotFoundException_1.default(zip));
                });
                next('');
            }
            else {
                res.status(200).send(allServices);
                next('');
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:zip`, this.getAllServicesByZip);
    }
    insertNewData(responseJson, zip) {
        return __awaiter(this, void 0, void 0, function* () {
            // Setting Address
            const address = new address_entity_1.default();
            address.zip = zip;
            address.city = responseJson.city;
            address.state = responseJson.state;
            const savedAddress = yield this.addressRepository.save(address).catch();
            // Setting Providers
            responseJson.providers.forEach((provider) => __awaiter(this, void 0, void 0, function* () {
                const prov = new providers_entity_1.default();
                // Setting Provider id
                prov.id = provider.providerId;
                // Setting Provider providerName
                prov.providerName = provider.providerName;
                // Setting Provider ProviderId
                prov.providerId = provider.providerId;
                // Setting Provider companyId
                prov.companyId = provider.companyId;
                // Setting Provider partnerId
                prov.partnerId = provider.partnerId;
                // Setting Provider serviceable
                prov.serviceable = provider.serviceable;
                // Setting Provider dataCount
                prov.datacount = provider.dataCount;
                const savedProvider = yield this.providersRepository.save(prov).catch();
                // Setting Address_providers
                const addProv = new address_provider_entity_1.default();
                // Setting AddressProvider Address
                addProv.address = savedAddress;
                // Setting AddressProvider Provider
                addProv.provider = savedProvider;
                const savedAddressProvider = this.addressProviderRepository.save(addProv);
                // Setting Categories
                provider.categories.forEach((category) => __awaiter(this, void 0, void 0, function* () {
                    const cat = new categories_entity_1.default();
                    let detCategory;
                    if (category.categoryName === 'Internet') {
                        detCategory = (yield this.detailsCategoryRepository.findOne(1).catch());
                        // Setting Category categoryNameId
                        cat.categoryName = detCategory;
                        // Setting Category serviceable
                        cat.serviceable = category.serviceable;
                        // Setting Category datacount
                        cat.datacount = category.dataCount;
                        // Setting Category ProviderId;
                        cat.provider = savedProvider;
                        // Setting details
                        const det = new details_entity_1.default();
                        det.detailsCategory = detCategory;
                        det.minPrice = category.details.minPrice;
                        det.maxDownloadSpeed = category.details.maxDownloadSpeed;
                        det.maxDownloadSpeedUnit = category.details.maxDownloadSpeedUnit;
                        det.minDownloadSpeed = category.details.minDownloadSpeed;
                        det.minDownloadSpeedUnit = category.details.minDownloadSpeedUnit;
                        const savedDetails = yield this.detailsRepository.save(det).catch();
                        // Setting Category detailsId
                        cat.details = savedDetails;
                        const savedCategories = yield this.categoriesRepository.save(cat).catch();
                        // Setting Technologies
                        category.technologies.forEach((technology) => __awaiter(this, void 0, void 0, function* () {
                            const tech = new technologies_entity_1.default();
                            tech.technologyName = technology.technologyName;
                            tech.serviceable = technology.serviceable;
                            tech.datacount = technology.dataCount;
                            tech.details = savedDetails;
                            tech.dataGranularity = technology.dataGranularity;
                            tech.category = savedCategories;
                            const savedTechnologies = yield this.technologiesRepository.save(tech).catch();
                        }));
                    }
                    if (category.categoryName === 'Phone') {
                        detCategory = (yield this.detailsCategoryRepository.findOne(2).catch());
                        // Setting Category categoryNameId
                        cat.categoryName = detCategory;
                        // Setting Category serviceable
                        cat.serviceable = category.serviceable;
                        // Setting Category datacount
                        cat.datacount = category.dataCount;
                        // Setting Category ProviderId;
                        cat.provider = savedProvider;
                        // Setting details
                        const det = new details_entity_1.default();
                        det.detailsCategory = detCategory;
                        det.minPrice = provider.details.minPrice;
                        const savedDetails = yield this.detailsRepository.save(det).catch();
                        // Setting Category detailsId
                        cat.details = savedDetails;
                        const savedCategories = yield this.categoriesRepository.save(cat).catch();
                        // Setting Technologies
                        category.technologies.forEach((technology) => __awaiter(this, void 0, void 0, function* () {
                            const tech = new technologies_entity_1.default();
                            tech.technologyName = technology.technologyName;
                            tech.serviceable = technology.serviceable;
                            tech.datacount = technology.dataCount;
                            tech.details = savedDetails;
                            tech.dataGranularity = technology.dataGranularity;
                            tech.category = savedCategories;
                            const savedTechnologies = yield this.technologiesRepository.save(tech).catch();
                        }));
                    }
                    if (category.categoryName === 'Video') {
                        detCategory = (yield this.detailsCategoryRepository.findOne(3).catch());
                        // Setting Category categoryNameId
                        cat.categoryName = detCategory;
                        // Setting Category serviceable
                        cat.serviceable = category.serviceable;
                        // Setting Category datacount
                        cat.datacount = category.dataCount;
                        // Setting Category ProviderId;
                        cat.provider = savedProvider;
                        // Setting details
                        const det = new details_entity_1.default();
                        det.detailsCategory = detCategory;
                        det.minPrice = category.details.minPrice;
                        det.minChannels = category.details.minChannels;
                        det.maxChannels = category.details.maxChannels;
                        const savedDetails = yield this.detailsRepository.save(det).catch();
                        // Setting Category detailsId
                        cat.details = savedDetails;
                        const savedCategories = yield this.categoriesRepository.save(cat).catch();
                        // Setting Technologies
                        category.technologies.forEach((technology) => __awaiter(this, void 0, void 0, function* () {
                            const tech = new technologies_entity_1.default();
                            tech.technologyName = technology.technologyName;
                            tech.serviceable = technology.serviceable;
                            tech.datacount = technology.dataCount;
                            tech.details = savedDetails;
                            tech.dataGranularity = technology.dataGranularity;
                            tech.category = savedCategories;
                            const savedTechnologies = yield this.technologiesRepository.save(tech).catch();
                        }));
                    }
                }));
            }));
        });
    }
}
exports.default = MainController;
//# sourceMappingURL=main.controller.js.map
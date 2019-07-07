import Controller from '../interfaces/controller.interface';
import express, { response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import Address from '../entities/address.entity';
import axios, { AxiosResponse } from 'axios';
import ZipNotFoundException from '../exceptions/ZipNotFoundException';
import Provider from '../entities/providers.entity';
import Categories from '../entities/categories.entity';
import DetailsCategory from '../entities/detailsCategory.entity';
import Details from '../entities/details.entity';
import Technologies from '../entities/technologies.entity';

class MainController implements Controller {
  public path = '/fetch';
  public router = express.Router();
  private addressRepository = getRepository(Address);
  private detailsCategoryRepository = getRepository(DetailsCategory);
  private providersRepository = getRepository(Provider);
  private categoriesRepository = getRepository(Categories);
  private detailsRepository = getRepository(Details);
  private technologiesRepository = getRepository(Technologies);

  constructor(){
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(`${this.path}/:zip`, this.getAllServicesByZip);
  }

  private getAllServicesByZip = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const zip = req.params.zip;
    const allServices = await this.addressRepository.findOne({
      where: { zip: zip},
    });
    if (allServices){
      res.status(200).send(allServices);
    }else {
      await axios.post('https://predict.harbinger.redventures.io/serviceability/projected/zip', { zip: zip,
      }).then(async (response: AxiosResponse) => {
        this.insertNewData(response.data, zip);
        res.status(200).send(await this.addressRepository.findOne( {
          where: {zip: zip},
        }))
      }).catch(() => {
        res.status(404).send(new ZipNotFoundException(zip));
      })
    }
  }

  private async insertNewData(responseJson: serviceability, zip: string) {
    // Setting Address
    const address = new Address();
    address.zip = zip;
    address.city = responseJson.city;
    address.state = responseJson.state;
    const savedAddress = await this.addressRepository.save(address);

    // Setting Providers
    responseJson.providers.forEach(async (provider) => {
      const prov = new Provider();
      // Setting Provider id
      prov.id = provider.providerId;
      // Setting Provider providerName
      prov.providerName = provider.providerName;
      // Setting Provider companyId
      prov.companyId = provider.companyId;
      // Setting Provider partnerId
      prov.partnerId = provider.partnerId;
      // Setting Provider serviceable
      prov.serviceable = provider.serviceable;
      // Setting Provider dataCount
      prov.datacount = provider.dataCount;
      // Setting Provider addressId
      prov.address = savedAddress;

      const savedProvider = await this.providersRepository.save(prov);

      // Setting Categories
      provider.categories.forEach(async (category) => {
        const cat = new Categories();
        let detCategory;
        if(category.categoryName === 'Internet') {
          detCategory = await this.detailsCategoryRepository.findOne(1) as DetailsCategory;
          // Setting Category categoryNameId
          cat.categoryName = detCategory;
          // Setting Category serviceable
          cat.serviceable = category.serviceable;
          // Setting Category datacount
          cat.datacount = category.dataCount;
          // Setting Category ProviderId;
          cat.provider = savedProvider;

          // Setting details
          const det = new Details();
          det.detailsCategory = detCategory;
          det.minPrice = category.details.minPrice;
          det.maxDownloadSpeed = category.details.maxDownloadSpeed;
          det.maxDownloadSpeedUnit = category.details.maxDownloadSpeedUnit;
          det.minDownloadSpeed = category.details.minDownloadSpeed;
          det.minDownloadSpeedUnit = category.details.minDownloadSpeedUnit;
          const savedDetails = await this.detailsRepository.save(det);

          // Setting Category detailsId
          cat.details = savedDetails;

          const savedCategories = await this.categoriesRepository.save(cat);
          // Setting Technologies
          category.technologies.forEach(async (technology) => {
            const tech = new Technologies();
            tech.technologyName = technology.technologyName;
            tech.serviceable = technology.serviceable;
            tech.datacount = technology.dataCount;
            tech.details = savedDetails;
            tech.dataGranularity = technology.dataGranularity;
            tech.categories = savedCategories;

            const savedTechnologies = await this.technologiesRepository.save(tech);
          });
        }

        if(category.categoryName === 'Phone') {
          detCategory = await this.detailsCategoryRepository.findOne(2) as DetailsCategory;
          // Setting Category categoryNameId
          cat.categoryName = detCategory;
          // Setting Category serviceable
          cat.serviceable = category.serviceable;
          // Setting Category datacount
          cat.datacount = category.dataCount;
          // Setting Category ProviderId;
          cat.provider = savedProvider;

          // Setting details
          const det = new Details();
          det.detailsCategory = detCategory;
          det.minPrice = provider.details.minPrice;
          const savedDetails = await this.detailsRepository.save(det);

          // Setting Category detailsId
          cat.details = savedDetails;

          const savedCategories = await this.categoriesRepository.save(cat);
          // Setting Technologies
          category.technologies.forEach(async (technology) => {
            const tech = new Technologies();
            tech.technologyName = technology.technologyName;
            tech.serviceable = technology.serviceable;
            tech.datacount = technology.dataCount;
            tech.details = savedDetails;
            tech.dataGranularity = technology.dataGranularity;
            tech.categories = savedCategories;

            const savedTechnologies = await this.technologiesRepository.save(tech);
          });
        }

        if(category.categoryName === 'Video') {
          detCategory = await this.detailsCategoryRepository.findOne(3) as DetailsCategory;
          // Setting Category categoryNameId
          cat.categoryName = detCategory;
          // Setting Category serviceable
          cat.serviceable = category.serviceable;
          // Setting Category datacount
          cat.datacount = category.dataCount;
          // Setting Category ProviderId;
          cat.provider = savedProvider;

          // Setting details
          const det = new Details();
          det.detailsCategory = detCategory;
          det.minPrice = category.details.minPrice;
          det.minChannels = category.details.minChannels;
          det.maxChannels = category.details.maxChannels;
          const savedDetails = await this.detailsRepository.save(det);

          // Setting Category detailsId
          cat.details = savedDetails;

          const savedCategories = await this.categoriesRepository.save(cat);
          // Setting Technologies
          category.technologies.forEach(async (technology) => {
            const tech = new Technologies();
            tech.technologyName = technology.technologyName;
            tech.serviceable = technology.serviceable;
            tech.datacount = technology.dataCount;
            tech.details = savedDetails;
            tech.dataGranularity = technology.dataGranularity;
            tech.categories = savedCategories;

            const savedTechnologies = await this.technologiesRepository.save(tech);
          });
        }
      });
    });
  }
}

export default MainController;

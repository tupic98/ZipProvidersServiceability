interface serviceability {
  city: string,
  state: string,
  providers: Plan[]
}

interface Plan {
  categories: Category[],
  companyId: number,
  dataCount: number,
  details: DetailsCategories,
  partnerId: number,
  providerId: number,
  providerName: string,
  serviceable: number,
}

interface Category {
  categoryName: string,
  dataCount: number,
  details: DetailsCategories,
  serviceable: number,
  technologies: Technology[],
}

interface Technology {
  dataCount: number,
  dataGranularity: string,
  details: DetailsCategories,
  serviceable: number,
  technologyName: string,
}

interface DetailsCategories {
  maxDownloadSpeed: string,
  maxDownloadSpeedUnit: string,
  minDownloadSpeed: string,
  minDownloadSpeedUnit: string,
  minPrice: string,

  minChannels: string,
  maxChannels: string,
}

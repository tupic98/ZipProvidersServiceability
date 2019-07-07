import HttpException from './HttpException';

class ZipNotFoundException extends HttpException {
  constructor(zip: string){
    super(404, `Zip ${zip} not found`);
  }
}

export default ZipNotFoundException;

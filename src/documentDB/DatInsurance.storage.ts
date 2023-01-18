import { DatInsuranceEntity } from './entities.definitions';
import { DatInsuranceModel } from './models/DatInsurance.model';

export class DatInsuranceStorage {
  constructor() {}
  async insert(datInsurance: DatInsuranceEntity): Promise<any> {
    return await DatInsuranceModel.create(datInsurance);
    // const dbModel = (await this.documentDbDriver.insert(datInsurance)) as any;
    // return dbModel;
  }

  async update(datInsurance: DatInsuranceEntity): Promise<any> {
    return await DatInsuranceModel.updateOne({ todoAddConditions: 'ADD FILTER CONDITIONS HERE' }, datInsurance);
    // return await this.documentDbDriver.updateOne('ADD FILTER CONDITIONS HERE', datInsurance);
  }
}

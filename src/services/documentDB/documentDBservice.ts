import * as mongoose from 'mongoose';
import { DocumentDBConfig } from '../../config/documentDB.config';

export class DocumentDBService {
  static connection: mongoose.Mongoose;

  static async connect(): Promise<void> {
    if (this.connection) {
      return;
    }
    mongoose.set('strictQuery', true);
    this.connection = await mongoose.connect(DocumentDBConfig.URL);
  }

  static async disconnect(): Promise<void> {
    this.connection = null;
    await mongoose.disconnect();
  }
}

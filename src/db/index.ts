import { join } from 'path';
import { JsonDB, Config } from 'node-json-db';

const filename: string = join(__dirname, 'db.json');
const db: JsonDB = new JsonDB(new Config(filename, true, true, '/'));

export default db;
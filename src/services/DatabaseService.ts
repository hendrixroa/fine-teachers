import * as lowdb from 'lowdb';
import FileSync = require('lowdb/adapters/FileSync');

export class DatabaseService {
  private connection: any;

  constructor() {
    const adapter = new FileSync('db.json');
    this.connection = lowdb(adapter);
    this.connection.defaults({ posts: [], user: {}, count: 0 }).write();
  }

  public saveUser() {
    this.connection.set('user.name', 'typicode').write();
  }
}

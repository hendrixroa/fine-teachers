import * as lowdb from 'lowdb';
import FileSync = require('lowdb/adapters/FileSync');

export class DatabaseService {
  protected connection: any;

  constructor() {
    const adapter = new FileSync('db.json');
    this.connection = lowdb(adapter);
    this.connection
      .defaults({
        classes: [],
        quizzes: [],
        students: [],
        teachers: [],
      })
      .write();
  }

  public getConnection() {
    return this.connection;
  }
}

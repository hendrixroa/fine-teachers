import { TeacherResponse } from '@/apps/api/controllers/TeacherController';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import * as uuid from 'uuid/v4';
import { DatabaseService } from './DatabaseService';

export class TeacherPayload {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsInt()
  @IsNotEmpty()
  public age: number;
}

export class TeacherService {
  private conn: any;

  constructor(private databaseService: DatabaseService) {
    this.conn = this.databaseService.getConnection();
  }

  public async createTeacher(payload: TeacherPayload): Promise<string> {
    const id: string = uuid();
    await this.conn
      .get('teachers')
      .push({ uuid: id, ...payload })
      .write();
    return id;
  }

  public async getTeacher(id: string): Promise<TeacherResponse> {
    const teacher = await this.conn.get('teachers').find({ uuid: id });
    return teacher;
  }

  public async updateTeacher(
    id: string,
    payload: TeacherPayload,
  ): Promise<TeacherResponse> {
    const teacher = await this.conn
      .get('teachers')
      .find({ uuid: id })
      .assign({ ...payload })
      .write();
    return teacher;
  }

  public async deleteTeacher(id: string): Promise<void> {
    await this.conn
      .get('teachers')
      .remove({ uuid: id })
      .write();
  }
}

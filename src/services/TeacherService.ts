import { IsInt, IsNotEmpty, IsString } from 'class-validator';
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
  constructor(private databaseService: DatabaseService) {}

  public async createTeacher(payload: TeacherPayload): Promise<boolean> {
    this.databaseService.saveUser();
    return true;
  }
}

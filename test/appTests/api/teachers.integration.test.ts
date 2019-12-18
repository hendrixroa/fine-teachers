import { DatabaseService } from '@/services/DatabaseService';
import { TeacherService } from '@/services/TeacherService';
import { randomValue, randomValueHex } from '@/shared/helpers';
import { expect } from 'chai';
import * as fs from 'fs';
import { agent } from '../../apiTestHelpers';

// tslint:disable-next-line
declare namespace Chai {
  interface TypeComparison {
    uuid: () => void;
  }
}

const databaseService = new DatabaseService();
const teacherService = new TeacherService(databaseService);

const createTeacher = async () => {
  const teacher = await teacherService.createTeacher({
    age: randomValue(100, 1),
    name: `Peter${randomValueHex(4)}`,
  });
  return teacher;
};

describe('Teachers CRUD', () => {
  it('Should get Teacher from DB', async () => {
    const teacherIdToGet = await createTeacher();

    return agent.get(`/teacher/${teacherIdToGet}`).then((res: any) => {
      expect(teacherIdToGet).to.be.equal(res.body.data.uuid);
    });
  });

  it('Should creates Teacher in DB', (done: (err?: any) => void) => {
    const teacherToCreate = {
      age: randomValue(100, 1),
      name: `RobertC${randomValueHex(4)}`,
    };

    agent
      .post('/teacher')
      .send(teacherToCreate)
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.be.equal(200);
        return done();
      });
  });

  it('Should updates Teacher in DB', (done: (err?: any) => void) => {
    // First create a teacher
    const teacherToUpdate = {
      age: 50,
      name: 'Robert C Martin',
    };

    agent
      .put('/teacher')
      .send(teacherToUpdate)
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.be.equal(200);
        return done();
      });
  });

  it('Should delete Teacher in DB', (done: (err?: any) => void) => {
    // First create a teacher
    const teacherIdToDelete = 1;

    agent.delete(`/teacher/${teacherIdToDelete}`).end((err: any, res: any) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.be.equal(200);
      return done();
    });
  });
});

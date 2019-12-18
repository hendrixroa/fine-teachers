import { DatabaseService } from '@/services/DatabaseService';
import { TeacherService } from '@/services/TeacherService';
import { randomValue, randomValueHex } from '@/shared/helpers';
import { expect } from 'chai';
import { agent } from '../../apiTestHelpers';

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

  it('Should updates Teacher in DB', async () => {
    const teacherIdToUpdate = await createTeacher();
    const teacherPayloadToUpdate = {
      age: randomValue(100, 1),
      name: `NewTeacher${randomValueHex(4)}`,
    };

    return agent
      .put(`/teacher/${teacherIdToUpdate}`)
      .send(teacherPayloadToUpdate)
      .then((res: any) => {
        expect(res.status).to.be.equal(200);
        expect(teacherPayloadToUpdate.name).to.be.equal(res.body.data.name);
        expect(teacherPayloadToUpdate.age).to.be.equal(res.body.data.age);
      });
  });

  it('Should delete Teacher in DB', async () => {
    const teacherIdToDelete = await createTeacher();

    return agent.delete(`/teacher/${teacherIdToDelete}`).then((res: any) => {
      expect(res.status).to.be.equal(200);
    });
  });
});

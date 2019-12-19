import { DatabaseService } from '@/services/DatabaseService';
import { randomValue, randomValueHex } from '@/shared/helpers';
import { expect } from 'chai';
import { agent } from '../../apiTestHelpers';

const databaseService = new DatabaseService();

describe('Students CRUD', () => {
  it('Should get student from DB', async () => {
    const studentIdToGet = 1;

    return agent.get(`/student/${studentIdToGet}`).then((res: any) => {
      expect(studentIdToGet).to.be.equal(res.body.data.uuid);
    });
  });

  it('Should create student in DB', (done: (err?: any) => void) => {
    const studentToCreate = {
      age: randomValue(100, 1),
      name: `RobertC${randomValueHex(4)}`,
    };

    agent
      .post('/student')
      .send(studentToCreate)
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.be.equal(200);
        return done();
      });
  });

  it('Should updates student in DB', async () => {
    const studentIdToUpdate = 1;
    const studentPayloadToUpdate = {
      age: randomValue(100, 1),
      name: `Newstudent${randomValueHex(4)}`,
    };

    return agent
      .put(`/student/${studentIdToUpdate}`)
      .send(studentPayloadToUpdate)
      .then((res: any) => {
        expect(res.status).to.be.equal(200);
        expect(studentPayloadToUpdate.name).to.be.equal(res.body.data.name);
        expect(studentPayloadToUpdate.age).to.be.equal(res.body.data.age);
      });
  });

  it('Should delete student in DB', async () => {
    const studentIdToDelete = 1;

    return agent.delete(`/student/${studentIdToDelete}`).then((res: any) => {
      expect(res.status).to.be.equal(200);
    });
  });
});

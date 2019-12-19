import { DatabaseService } from '@/services/DatabaseService';
import { randomValue, randomValueHex } from '@/shared/helpers';
import { expect } from 'chai';
import { agent } from '../../apiTestHelpers';

const databaseService = new DatabaseService();

describe('Classes CRUD', () => {
  it('Should get classes from DB', async () => {
    const classesIdToGet = 1;

    return agent.get(`/classes/${classesIdToGet}`).then((res: any) => {
      expect(classesIdToGet).to.be.equal(res.body.data.uuid);
    });
  });

  it('Should create classes in DB', (done: (err?: any) => void) => {
    const classesToCreate = {
      age: randomValue(100, 1),
      name: `RobertC${randomValueHex(4)}`,
    };

    agent
      .post('/classes')
      .send(classesToCreate)
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.be.equal(200);
        return done();
      });
  });

  it('Should updates classes in DB', async () => {
    const classesIdToUpdate = 1;
    const classesPayloadToUpdate = {
      age: randomValue(100, 1),
      name: `Newclasses${randomValueHex(4)}`,
    };

    return agent
      .put(`/classes/${classesIdToUpdate}`)
      .send(classesPayloadToUpdate)
      .then((res: any) => {
        expect(res.status).to.be.equal(200);
        expect(classesPayloadToUpdate.name).to.be.equal(res.body.data.name);
        expect(classesPayloadToUpdate.age).to.be.equal(res.body.data.age);
      });
  });

  it('Should delete classes in DB', async () => {
    const classesIdToDelete = 1;

    return agent.delete(`/classes/${classesIdToDelete}`).then((res: any) => {
      expect(res.status).to.be.equal(200);
    });
  });
});

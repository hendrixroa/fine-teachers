import { DatabaseService } from '@/services/DatabaseService';
import { randomValue, randomValueHex } from '@/shared/helpers';
import { expect } from 'chai';
import { agent } from '../../apiTestHelpers';

const databaseService = new DatabaseService();

describe('quizzes CRUD', () => {
  it('Should get quizzes from DB', async () => {
    const quizzesIdToGet = 1;

    return agent.get(`/quizzes/${quizzesIdToGet}`).then((res: any) => {
      expect(quizzesIdToGet).to.be.equal(res.body.data.uuid);
    });
  });

  it('Should create quizzes in DB', (done: (err?: any) => void) => {
    const quizzesToCreate = {
      age: randomValue(100, 1),
      name: `RobertC${randomValueHex(4)}`,
    };

    agent
      .post('/quizzes')
      .send(quizzesToCreate)
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.be.equal(200);
        return done();
      });
  });

  it('Should updates quizzes in DB', async () => {
    const quizzesIdToUpdate = 1;
    const quizzesPayloadToUpdate = {
      age: randomValue(100, 1),
      name: `Newquizzes${randomValueHex(4)}`,
    };

    return agent
      .put(`/quizzes/${quizzesIdToUpdate}`)
      .send(quizzesPayloadToUpdate)
      .then((res: any) => {
        expect(res.status).to.be.equal(200);
        expect(quizzesPayloadToUpdate.name).to.be.equal(res.body.data.name);
        expect(quizzesPayloadToUpdate.age).to.be.equal(res.body.data.age);
      });
  });

  it('Should delete quizzes in DB', async () => {
    const quizzesIdToDelete = 1;

    return agent.delete(`/quizzes/${quizzesIdToDelete}`).then((res: any) => {
      expect(res.status).to.be.equal(200);
    });
  });
});

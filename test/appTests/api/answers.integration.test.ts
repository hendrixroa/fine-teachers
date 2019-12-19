import { DatabaseService } from '@/services/DatabaseService';
import { randomValue, randomValueHex } from '@/shared/helpers';
import { expect } from 'chai';
import { agent } from '../../apiTestHelpers';

const databaseService = new DatabaseService();

describe('Answers CRUD', () => {
  it('Should get answers from DB', async () => {
    const answersIdToGet = 1;

    return agent.get(`/answers/${answersIdToGet}`).then((res: any) => {
      expect(answersIdToGet).to.be.equal(res.body.data.uuid);
    });
  });

  it('Should create answers in DB', (done: (err?: any) => void) => {
    const answersToCreate = {
      age: randomValue(100, 1),
      name: `RobertC${randomValueHex(4)}`,
    };

    agent
      .post('/answers')
      .send(answersToCreate)
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.be.equal(200);
        return done();
      });
  });

  it('Should updates answers in DB', async () => {
    const answersIdToUpdate = 1;
    const answersPayloadToUpdate = {
      age: randomValue(100, 1),
      name: `Newanswers${randomValueHex(4)}`,
    };

    return agent
      .put(`/answers/${answersIdToUpdate}`)
      .send(answersPayloadToUpdate)
      .then((res: any) => {
        expect(res.status).to.be.equal(200);
        expect(answersPayloadToUpdate.name).to.be.equal(res.body.data.name);
        expect(answersPayloadToUpdate.age).to.be.equal(res.body.data.age);
      });
  });

  it('Should delete answers in DB', async () => {
    const answersIdToDelete = 1;

    return agent.delete(`/answers/${answersIdToDelete}`).then((res: any) => {
      expect(res.status).to.be.equal(200);
    });
  });
});

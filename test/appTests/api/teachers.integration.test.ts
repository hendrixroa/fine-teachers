import { expect } from 'chai';
import { agent } from '../../apiTestHelpers';

// tslint:disable-next-line
declare namespace Chai {
  interface TypeComparison {
    uuid: () => void;
  }
}

describe('Teachers CRUD', () => {
  it('Should get Teacher in DB', (done: (err?: any) => void) => {
    // First create a teacher
    const teacherIdToGet = 1;

    agent
      .get(`/teacher/${teacherIdToGet}`)
      .send()
      .expect(200)
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.be.equal(200);
        return done();
      });
  });
});

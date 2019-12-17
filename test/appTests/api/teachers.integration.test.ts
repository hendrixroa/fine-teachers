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

    agent.get(`/teacher/${teacherIdToGet}`).end((err: any, res: any) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.be.equal(200);
      return done();
    });
  });

  it('Should creates Teacher in DB', (done: (err?: any) => void) => {
    // First create a teacher
    const teacherToCreate = {
      age: 50,
      name: 'Robert C Martin',
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

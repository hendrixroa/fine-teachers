import * as supertest from 'supertest';

import { api } from '@/apps/api/api';

export const agent = supertest(api);

declare global {
  // tslint:disable-next-line
  interface Blob {}
}

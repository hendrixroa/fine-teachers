import { asClass, asValue, InjectionMode } from 'awilix';

import { createTypedContainer } from '@/shared/createTypedContainer';
import { DatabaseService } from './services/DatabaseService';
import { ErrorService } from './services/ErrorService';
import { LogContext, LogService } from './services/LogService';
import { TeacherService } from './services/TeacherService';

export interface RequestContext {
  origin: string;
  isFrontendRequest: boolean;
}

export const container = createTypedContainer(
  {
    authContext: asValue(undefined),
    databaseService: asClass(DatabaseService).singleton(),
    errorService: asClass(ErrorService).singleton(),
    logContext: asValue(undefined),
    logService: asClass(LogService).scoped(),
    requestContext: asValue(undefined),
    teacherService: asClass(TeacherService).singleton(),
    validServiceKey: asValue(false),
  },
  {
    injectionMode: InjectionMode.CLASSIC,
  },
);

export function createContainerScope(
  logContext?: LogContext,
  requestContext?: RequestContext,
) {
  const scope = container.createScope();
  scope.register('logContext', asValue(logContext));
  scope.register('requestContext', asValue(requestContext));
  return scope;
}

export type ContainerType = typeof container;

import { SuccessResponse } from '@/services/apiHelpers';
import { TeacherPayload } from '@/services/TeacherService';
import {
  Context,
  GET,
  Path,
  PathParam,
  POST,
  Security,
  ServiceContext,
} from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';

@Tags('Teachers')
@Path('/teacher')
@Security()
export class TeacherController {
  @Context
  private context: ServiceContext;
  /**
   * Create a Teacher
   * @summary create teacher
   */
  @POST
  public async create(payload: TeacherPayload): Promise<any> {
    const res = await this.context.request.container
      .resolve('teacherService')
      .createTeacher(payload);
    return new SuccessResponse({ hi: 'Hello world' });
  }

  /**
   * Get Teacher given an `id`
   * @summary Obtain teacher
   */
  @Path(':id')
  @GET
  public async read(@PathParam('id') id: string): Promise<any> {
    return {
      name: 'Bob',
    };
  }
}

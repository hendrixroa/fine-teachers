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

export interface TeacherResponse {
  age: number;
  name: string;
  uuid: string;
}

export interface TeacherCreated {
  uuid: string;
}

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
  public async create(
    payload: TeacherPayload,
  ): Promise<SuccessResponse<TeacherCreated>> {
    const res = await this.context.request.container
      .resolve('teacherService')
      .createTeacher(payload);
    return new SuccessResponse({ uuid: res });
  }

  /**
   * Get Teacher given an `uuid`
   * @summary Obtain teacher
   */
  @Path(':uuid')
  @GET
  public async read(
    @PathParam('uuid') uuid: string,
  ): Promise<SuccessResponse<TeacherResponse>> {
    const res = await this.context.request.container
      .resolve('teacherService')
      .getTeacher(uuid);
    return new SuccessResponse(res);
  }
}

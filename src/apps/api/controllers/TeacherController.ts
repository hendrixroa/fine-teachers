import { SuccessResponse } from '@/services/apiHelpers';
import { TeacherPayload } from '@/services/TeacherService';
import {
  Context,
  DELETE,
  GET,
  Path,
  PathParam,
  POST,
  PUT,
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

  /**
   * Update a Teacher given an `uuid` and payload
   * @summary Update a teacher
   */
  @Path(':uuid')
  @PUT
  public async update(
    @PathParam('uuid') uuid: string,
    payload: TeacherPayload,
  ): Promise<SuccessResponse<TeacherResponse>> {
    const res = await this.context.request.container
      .resolve('teacherService')
      .updateTeacher(uuid, payload);
    return new SuccessResponse(res);
  }

  /**
   * Delete a Teacher given an `uuid`
   * @summary Delete a teacher
   */
  @Path(':uuid')
  @DELETE
  public async delete(@PathParam('uuid') uuid: string): Promise<void> {
    await this.context.request.container
      .resolve('teacherService')
      .deleteTeacher(uuid);
  }
}

import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    Response,
    SuccessResponse,
    Example,
  } from "tsoa";

  import { User } from "./user";
  import { UsersService, UserCreationParams } from "./usersService";

  interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
  }
@Route("users")
export class UsersController extends Controller {
  @Example<User>({
    id: 123,
    name: "tsoa user",
    email: "hello@tsoa.com",
    phoneNumbers: [],
    status: "Happy",
  })
  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @param userId The user's identifier
   * @param name Provide a username to display
   */
    @Get("{userId}")
    public async getUser(
      @Path() userId: number,
      @Query() name?: string
    ): Promise<User> {
      return new UsersService().get(userId, name);
    }

    @SuccessResponse("201", "Created")
    @Post()
    @Response<ValidateErrorJSON>(422, "Validation Failed", {
      message: "Validation failed",
      details: {
        requestBody: {
          message: "id is an excess property and therefore not allowed",
          value: "52907745-7672-470e-a803-a2f8feb52944",
        },
      },
    })
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201);
        new UsersService().create(requestBody);
        return;
    }
}
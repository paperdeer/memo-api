import { Body, Controller, Get, HttpException, Logger, Post, Param } from '@nestjs/common';
import { ValidationError } from 'Joi';
import { UserRepository } from './user.repository';
import { Response, ResponseMessage } from '../util/response.util';
import { loginSchema, registerSchema } from './user.schema';
import { UserService } from './user.service';
import { Login,  Register, UserInfo } from './user.type';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}
  @Post("register")
  public async addUser(@Body() register: Register): Promise<Response> {
    try {
      const { value, error }: { value: Register, error?: ValidationError } = registerSchema.validate(register);

      if (error) {
        Logger.error(error);
        return new ResponseMessage().error(999).body("Parameter Error").build();
      }

      const user: UserInfo = await this.userService.addUser(value);
      Logger.log(value);
      return new ResponseMessage().success().body(user).build();
    } catch (err) {
      Logger.error(err);
    }
  }

  @Post('login')
  public async login(@Body() login: Login): Promise<Response> {
    const { value, error }: { value: Login, error?: ValidationError } = loginSchema.validate(login);

    if (error) {
      Logger.error(error);
      return new ResponseMessage().error(999).body("Parameter Error").build();
    }
    const user = await this.userService.login(value);


    if (!user) {
      throw new HttpException('Login Error', 404);
    }

    return new ResponseMessage().success().body(user).build();
  }
  // @Post('memo/:memoId')
  // public async postMemo(@Body() memo : memoContent) : Promise<Response>{
  //   const { value }: { value: memoContent} = loginSchema.validate(memo);
  //   const memoCt = await this.userService.postMemo(value);
  //   return new ResponseMessage().success().body(memoCt).build();
  // }
  // @Get('memo/:memoId')
  // async findOne(@Param('userId') id: string): Promise<Response> {
  //   const foundUser = await this.userService.findOne({
  //     where:{
  //       memoId : id
  //     }
  //   });
  //   return Object.assign({
  //     data: foundUser,
  //     statusCode: 200,
  //     statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
  //   });
  // }
}

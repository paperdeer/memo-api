import { Injectable, Logger, Param } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { Login, UserInfo, LoginUserInfo, Register } from './user.type';
import * as Bcrypt from 'bcryptjs';
import { Token } from 'src/util/token.util';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository){this.userRepository = userRepository}
  
  public async addUser(register: Register): Promise<UserInfo>{
    const registerUser = await this.userRepository.create();

    // Encode User Password
    const salt: string = await Bcrypt.genSalt(10);
    const password: string = await Bcrypt.hash(register.password, salt);
    
    registerUser.email = register.email;
    registerUser.name = register.name;
    registerUser.uuid = Token.getUUID();
    registerUser.password = password;
    const user = await this.userRepository.save(registerUser);
    
    const userInfo: UserInfo = {
      email: user.email,
      name: user.name,
      uuid: user.uuid
    };
    return userInfo;
  }

  public async login(loginUser: Login): Promise<LoginUserInfo>{
    const user = await this.userRepository.findOne({
      where:{
        email: loginUser.email
      }
    });

    if (!user) return null;

    const passwordCheck = await Bcrypt.compare(loginUser.password, user.password);

    if(!passwordCheck){
      return null;
    }
    
    user.lastLoginDate = new Date();
    
    await this.userRepository.save(user);;

    const userInfo: LoginUserInfo = {
      email: user.email,
      name: user.name,
      uuid: user.uuid,
      lastLogin: user.lastLoginDate
    };
    return userInfo;
  }
  // public async postMemo(memoContent : memoContent){
  //   const memoInfo = {
  //     title : memoContent.title,
  //     content : memoContent.content
  //   }
  //   return memoInfo;
  // }
  // public async getMemo(memoContent : memoContent){
  //   const memeInfo = {
  //     title : memoContent.title,
  //     content : memoContent.content
  //   }
  //   return memeInfo;
  // }
}
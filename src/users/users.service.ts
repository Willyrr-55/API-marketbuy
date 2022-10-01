import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { FilterUserDto } from './dto/filter-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
    private jwtService: JwtService
    ){}

  async create(createUserDto: CreateUserDto): Promise<User>{
    const passwordHashed = await this.hasPassword(createUserDto.password);
    createUserDto.password = passwordHashed;
    return this.userModel.create(createUserDto)
  }

  async findAll(filterUserDto:FilterUserDto): Promise<User[]>{
    const query = [];

    if(filterUserDto._id){
      query.push({_id:filterUserDto._id});
    }

    if(filterUserDto.email){
      query.push({email:new RegExp(filterUserDto.email,'i')});
    }

    if(filterUserDto.full_name){
      query.push({full_name:new RegExp(filterUserDto.full_name,'i')});
    }

    return this.userModel.find({
      $or:query
    }).exec();
  }

  async findOne(filterUserDto:FilterUserDto): Promise<User>{
    const query = [];

    if(filterUserDto._id){
      query.push({_id:filterUserDto._id});
    }

    if(filterUserDto.email){
      query.push({email:new RegExp(filterUserDto.email,'i')});
    }

    if(filterUserDto.full_name){
      query.push({full_name:new RegExp(filterUserDto.full_name,'i')});
    }

    return this.userModel.findOne(
      {
        $or:query
      }
    ).exec();
  }

  async findOneByEmail(email:string): Promise<User>{
    return this.userModel.findOne(
      {
       email
      }
    ).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({_id:id},updateUserDto,{
      new:true
    });
  }

  async changeStatus(id: string,status:boolean) {
    return this.userModel.findOneAndUpdate({_id:id},{$set:{status}})
  }

  async signUp(signUpDto: SignUpDto): Promise<User>{
    const passwordHashed = await this.hasPassword(signUpDto.password);
    signUpDto.password = passwordHashed;
    return this.userModel.create(signUpDto)
  }

  // TODO: Otros metodos
  async hasPassword(password:string){
    return bcrypt.hash(password,15)
  }

  async comparePassword(password:string,passwordUser:string){
    return bcrypt.compare(password,passwordUser)
  }

  async generateToken(payload:any){
    return this.jwtService.sign(payload)
  }

  async decodeToken(token:string){
    const decode = await this.jwtService.verify(token);
    return decode;
  };

  async revalidarToken (userId) {
    const user = await this.findOne(userId);
    const token = await this.generateToken({_id:user['_id'],role:user.role});
    return token;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../users/model/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcript';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const userExist = await this.userModel.findOne({ email });
    const isCheck = await compareHash(password, userExist.password);
    if (!userExist || !isCheck) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { email, id: userExist._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const { email, password } = registerAuthDto;
    const userExist = await this.userModel.findOne({ email });
    if (userExist) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    const passHash = await generateHash(password);
    registerAuthDto.password = passHash;
    this.userModel.create(registerAuthDto);
    return 'User created';
  }
}

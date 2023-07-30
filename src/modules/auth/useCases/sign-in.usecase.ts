import { SignInDTO } from '@/src/modules/auth/dtos';
import { IUserRepository } from '@/src/modules/users/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class SignInUseCase {
  constructor(
    private jwt: JwtService,
    private userRepository: IUserRepository,
  ) { }

  async execute(data: SignInDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatched = await compare(data.password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwt.signAsync(payload);

    return {
      accessToken: token,
    };
  }
}

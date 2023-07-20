import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, passwordHash } = createUserDto;

    const userCandidate = await this.findOne(email);
    if (userCandidate) {
      throw new BadRequestException('User already exists');
    }

    const user = new User(email, passwordHash);

    return this.userRepository.save(user);
  }

  async findOne(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}

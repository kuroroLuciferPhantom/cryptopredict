import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../common/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Check if username is unique
    if (registerDto.username) {
      const existingUsername = await this.prisma.user.findUnique({
        where: { username: registerDto.username },
      });

      if (existingUsername) {
        throw new ConflictException('Username already taken');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        hashedPassword,
        name: registerDto.name,
        username: registerDto.username,
      },
    });

    // Remove sensitive data
    const { hashedPassword: _, ...result } = user;

    // Generate token
    const token = this.generateToken(user);

    return {
      user: result,
      token,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.hashedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { hashedPassword, ...result } = user;
    return result;
  }

  async login(user: Omit<User, 'hashedPassword'>) {
    const token = this.generateToken(user);

    return {
      user,
      token,
    };
  }

  private generateToken(user: Partial<User>) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
    };

    return this.jwtService.sign(payload);
  }
}

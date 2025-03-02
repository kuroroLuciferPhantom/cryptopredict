import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../../common/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Check if email is already in use
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Check if username is already taken (if provided)
    if (createUserDto.username) {
      const existingUsername = await this.prisma.user.findUnique({
        where: {
          username: createUserDto.username,
        },
      });

      if (existingUsername) {
        throw new ConflictException('Username already taken');
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create the user
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        hashedPassword,
        name: createUserDto.name,
        username: createUserDto.username,
      },
    });

    // Generate JWT
    const token = this.generateToken(user);

    // Return user and token (excluding password)
    return {
      user: this.excludePassword(user),
      token,
    };
  }

  async login(loginDto: LoginDto) {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    // Check if user exists and password is correct
    if (!user || !(await this.validatePassword(loginDto.password, user.hashedPassword))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const token = this.generateToken(user);

    // Return user and token (excluding password)
    return {
      user: this.excludePassword(user),
      token,
    };
  }

  private generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  private async validatePassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private excludePassword(user: User) {
    const { hashedPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
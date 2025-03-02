import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        walletBalance: true,
        experience: true,
        leagueId: true,
        league: true,
        // Include card count in the response
        _count: {
          select: {
            cards: true,
            predictions: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if username is unique if provided
    if (updateUserDto.username) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          username: updateUserDto.username,
          id: { not: id },
        },
      });

      if (existingUser) {
        throw new ConflictException('Username already taken');
      }
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
        },
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          walletBalance: true,
          experience: true,
          leagueId: true,
          league: true,
        },
      });

      return updatedUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }
}

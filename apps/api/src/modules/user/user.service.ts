import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      // Pour l'instant, on simplifie l'inclusion car les relations ne sont pas définies
      // dans notre service Prisma simplifié
      // include: {
      //   cards: true,
      //   predictions: true,
      //   league: true,
      // },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.excludePassword(user);
  }

  async getProfile(userId: string) {
    const user = await this.findOne(userId);

    // Calculate statistics
    const stats = await this.calculateUserStats(userId);

    return {
      ...user,
      stats,
    };
  }

  private async calculateUserStats(userId: string) {
    // This would be implemented with actual calculations based on user's predictions, etc.
    return {
      totalPredictions: 0,
      correctPredictions: 0,
      accuracy: 0,
      totalEarnings: 0,
      // Add other stats as needed
    };
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Ensure user exists
    await this.findOne(id);

    // Check username uniqueness if being updated
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

    // Update user
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return this.excludePassword(updatedUser);
  }

  private excludePassword(user: any) {
    const { hashedPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
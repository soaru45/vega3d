import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, User, UserSettings } from '@vega3d/database';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email, deletedAt: null } });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id, deletedAt: null } });
  }

  async create(data: { email: string; passwordHash: string; name?: string; username?: string; }): Promise<User> {
    return prisma.user.create({ data });
  }

  async updateProfile(id: string, data: { name?: string; bio?: string; country?: string; language?: string }): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return prisma.user.update({ where: { id }, data });
  }

  async updateSettings(id: string, data: { emailNotifications?: boolean; themePreference?: string }): Promise<UserSettings> {
    return prisma.userSettings.upsert({
      where: { userId: id },
      update: data,
      create: { userId: id, ...data }
    });
  }

  async getSessions(userId: string) {
    return prisma.session.findMany({ where: { userId }, orderBy: { lastActive: 'desc' } });
  }

  async revokeSession(userId: string, sessionId: string) {
    await prisma.session.delete({ where: { id: sessionId, userId } });
  }

  async revokeAllOtherSessions(userId: string, currentSessionId: string) {
    await prisma.session.deleteMany({
      where: { userId, id: { not: currentSessionId } }
    });
  }

  async softDelete(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

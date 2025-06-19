import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async create(order: { items: any[]; total: number }) {
    return await this.prisma.order.create({
      data: {
        items: order.items,
        total: order.total,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

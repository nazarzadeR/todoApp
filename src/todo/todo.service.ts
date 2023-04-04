import { HttpException, Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { AddTodoDto, TodoCreateDto, UpdateTodoDto } from './dto/todo.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, credentials: TodoCreateDto) {
        return await this.prisma.todoList.create({
            data: {
                userId,
                ...credentials,
            },
        });
    }

    async addTodo(userId: string, todoId: string, credentials: AddTodoDto) {
        return await this.prisma.user.update({
            where: { id: userId },
            data: {
                todos: {
                    update: {
                        where: {
                            id: todoId,
                        },
                        data: {
                            todo: {
                                push: credentials
                            }
                        },
                    },
                },
            },
        });
    }

    async delete(userId: string, todoId: string) {
        return await this.prisma.user.update({
            where: {
                id: userId,
            },
            select: {
                todos: true,
            },
            data: {
                todos: {
                    delete: {
                        id: todoId,
                    },
                },
            },
        });
    }

    async update(userId: string, todoId: string, credentials: UpdateTodoDto) {
        return await this.prisma.user.update({
            where: {
                id: userId,
            },
            select: {
                todos: {
                    where: {
                        id: todoId,
                    },
                },
            },
            data: {
                todos: {
                    update: {
                        where: {
                            id: todoId,
                        },
                        data: credentials,
                    },
                },
            },
        });
    }

    async read(todoId: string) {
        try {
            return await this.prisma.todoList.findUniqueOrThrow({
                where: {
                    id: todoId,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            role: true,
                            username: true,
                        },
                    },
                },
            });
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new HttpException('No todo found', 404);
                }
            }
        }
    }
}

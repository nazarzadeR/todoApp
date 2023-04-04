import {
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    HttpCode,
    UseGuards,
    Controller,
    HttpStatus,
} from '@nestjs/common';

import { ATGuard } from 'auth/guard';
import { GetUser } from 'auth/decorator';
import { TodoService } from './todo.service';
import { AddTodoDto, TodoCreateDto, UpdateTodoDto } from './dto/todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Post()
    @UseGuards(ATGuard)
    @HttpCode(HttpStatus.CREATED)
    async create(
        @GetUser('id') id: string,
        @Body() credentials: TodoCreateDto,
    ) {
        return await this.todoService.create(id, credentials);
    }

    @Post(':id')
    @UseGuards(ATGuard)
    @HttpCode(HttpStatus.CREATED)
    async addTodo(
        @GetUser('id') id: string,
        @Param('id') todoId: string,
        @Body() credentials: AddTodoDto,
    ) {
        return await this.todoService.addTodo(id, todoId, credentials);
    }

    @Get(':id')
    @UseGuards(ATGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async read(@Param('id') todoId: string) {
        return await this.todoService.read(todoId);
    }

    @Delete(':id')
    @UseGuards(ATGuard)
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') todoId: string, @GetUser('id') userId: string) {
        return await this.todoService.delete(userId, todoId);
    }

    @Patch(':id')
    @UseGuards(ATGuard)
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') todoId: string,
        @GetUser('id') userId: string,
        @Body() credentials: UpdateTodoDto,
    ) {
        return await this.todoService.update(userId, todoId, credentials);
    }
}

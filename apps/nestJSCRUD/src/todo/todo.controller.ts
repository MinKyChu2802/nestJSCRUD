import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Todo } from './models/todo.model';
import { InjectModel } from '@nestjs/sequelize';

@Controller('todos')
export class TodoController {
  constructor(
    @InjectModel(Todo)
    private readonly todoModel: typeof Todo,
  ) {}

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todoModel.findByPk(id);
  }

  @Post()
  async createTodo(@Body() todo: Partial<Todo>): Promise<Todo> {
    return this.todoModel.create(todo);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updatedTodo: Todo,
  ): Promise<[number, Todo[]]> {
    return this.todoModel.update(updatedTodo, {
      where: { id },
      returning: true,
    });
  }

  @Delete(':id')
  async deleteTodoById(@Param('id') id: string): Promise<number> {
    return this.todoModel.destroy({ where: { id } });
  }
}

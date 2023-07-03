import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { Todo } from './models/todo.model';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// handle logic to add or update, remove data in database
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
  async getTodoById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Todo> {
    if (!id) {
      res.status(404).send('Error');
    }
    return this.todoModel.findByPk(id);
  }

  @Post()
  async createTodo(
    @Body() todo: Partial<Todo>,
    @Res() res: Response,
  ): Promise<Todo> {
    const id = uuidv4();
    const newBody = { id, ...todo };
    res.status(200).json({ ...newBody, message: 'Tạo thành công' });
    return this.todoModel.create(newBody);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updatedTodo: Todo,
    @Res() res: Response,
  ): Promise<[number, Todo[]]> {
    res.status(200).json({ message: 'Cập nhật công việc thành công' });
    return this.todoModel.update(updatedTodo, {
      where: { id },
      returning: true,
    });
  }

  @Delete(':id')
  async deleteTodoById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<number> {
    res.status(200).json({ message: 'Xoá công việc thành công' });
    return this.todoModel.destroy({ where: { id } });
  }
}

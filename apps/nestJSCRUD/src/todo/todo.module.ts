import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './models/todo.model';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  controllers: [TodoController],
})
export class TodoModule {}

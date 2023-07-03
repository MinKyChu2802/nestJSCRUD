import { Column, Model, Table } from 'sequelize-typescript';

// Define table and column in database
@Table
export class Todo extends Model {
  @Column({ primaryKey: true, allowNull: false })
  id: string;

  @Column({ defaultValue: 'Công việc' })
  title: string;

  @Column
  description: string;

  @Column({ defaultValue: false })
  completed: boolean;
}

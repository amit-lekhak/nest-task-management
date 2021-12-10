import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './task/dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    // this.tasks = this.tasks.map((task) => {
    //   if (task.id === id) {
    //     task.status = status;
    //   }
    //   return task;
    // });
    // return this.getTaskById(id);

    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
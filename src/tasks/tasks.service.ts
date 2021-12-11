import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './task/dto/create-task.dto';
import { FilterTaskDto } from './task/dto/filter-task-dto';

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
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task by id ${id} not found`);
    }

    return found;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
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

  getFilteredTasks(filterTaskDto: FilterTaskDto): Task[] {
    const { keyword, status } = filterTaskDto;

    let tasks = this.tasks;

    tasks = tasks.filter((task) => task.status === status);

    if (!filterTaskDto.keyword) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(keyword) || task.description.includes(keyword),
      );
    }

    return tasks;
  }
}

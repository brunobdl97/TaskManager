import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParams, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = []

    create(task: TaskDto): TaskDto {
        this.tasks.push(task)

        return this.tasks.find(fielteredTask => fielteredTask.id === task.id)
    }

    find(id: string): TaskDto {
        const found = this.tasks.find(task => task.id = id)

        if (!found) {
            throw new HttpException(`The task with id '${id}' was not found`, HttpStatus.NOT_FOUND)
        }

        return found
    }

    findAll(params: FindAllParams): TaskDto[] {
        let filteredTasks = this.tasks.filter(t => {
            let match = true;

            if (params.title != undefined && !t.title.includes(params.title)) {
                match = false
            }

            if (params.status != undefined && !t.status.includes(params.status)) {
                match = false
            }

            return match
        })

        if (!filteredTasks.length) {
            throw new HttpException("Any task was found", HttpStatus.NOT_FOUND)
        }

        return filteredTasks
    }

    update(task: TaskDto): TaskDto {
        let index = this.tasks.findIndex(t => t.id === task.id)

        if (index >= 0) {
            this.tasks[index] = task

            return this.find(task.id)
        }

        throw new HttpException(`The task with id '${task.id}' was not updated`, HttpStatus.BAD_REQUEST)
    }

    delete(id: string): void {
        let index = this.tasks.findIndex(t => t.id === id)

        if (index >= 0) {
            this.tasks.splice(index, 1)
        }

        throw new HttpException(`The task with id ${id} was not deleted`, HttpStatus.BAD_REQUEST)
    }
}

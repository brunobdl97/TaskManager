import { Body, Controller, Delete, Get, Param, Post, Put, Query, Response } from '@nestjs/common';
import { FindAllParams, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post()
    create(@Body() task: TaskDto) {
        return this.taskService.create(task)
    }

    @Get('/:id')
    find(@Param('id') id: string): TaskDto {
        return this.taskService.find(id)
    }

    @Get()
    findAll(@Query() params: FindAllParams): TaskDto[] {
        return this.taskService.findAll(params)
    }

    @Put()
    update(@Body() task: TaskDto): TaskDto {
        return this.taskService.update(task)
    }

    @Delete('/:id')
    delete(@Param('id') id: string): void {
        this.taskService.delete(id)
    }
}

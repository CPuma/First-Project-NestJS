import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req, Res } from '@nestjs/common';
import { TaskDTO } from '../models/task-dto';
import { TaskService } from './task.service'
import { Task } from '../interfaces/task';


@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {
    }

    @Get()
    getTasks(): Promise<Task[]> {
        console.log("listando las Tasks")
        return this.taskService.getTasks();

    }
    // comosi  fuese Express puro , solo en casos extremos
    @Get('/test')
    getTasksTest(@Req() req, @Res() res) {
        console.log("Test ")
        return res.json({ "hello": "Task TEST" });
    }

    @Get(':id')
    getTask(@Param('id') id: string): Promise<Task> {
        console.log("Buscando una task")
        return this.taskService.getTask(id);
    }



    @Post()
    createTask(@Body() task: TaskDTO): Promise<any> {
        return this.taskService.createTask(task)
    }

    @Put(':id')
    updateTask(@Param('id') id: string, @Body() task: TaskDTO, @Query('done') done) {
        console.log(done)   // solo es demostrativo. NO SE USA  para el CRUD
        console.log(id)
        console.log(task)
        return this.taskService.updateTask(id, task)
    }

    @Delete(':id/:done')
    deleteTask(@Param('id') id: string, @Param('done') done): Promise<any> {
        console.log(done) // solo es demostrativo. NO SE USA  para el CRUD
        console.log(id)
        return this.taskService.deleteTask(id);
    }

}

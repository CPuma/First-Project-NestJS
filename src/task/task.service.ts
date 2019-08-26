import { Injectable } from '@nestjs/common';
import { taskSchema } from '../schemas/task.schema';
import { Task } from '../interfaces/task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { TaskDTO } from '../models/task-dto';
import { TaskModule } from './task.module';

@Injectable()
export class TaskService {
    // @InjectModel('MODEL') -> MODEL es el nombre que se importo  en el task.Module como Feature
    constructor(@InjectModel('Task') private taskModel: Model<Task>) { }

    async getTasks(): Promise<Task[]> {
        return await this.taskModel.find();
    }

    async getTask(id: string): Promise<Task | any> {
        try {

            return await this.taskModel.findById(id);
        } catch (error) {
            return [];
        }
    }

    async createTask(task: TaskDTO): Promise<any> {
        const newTask = new this.taskModel(task);
        console.log(await newTask.save());
        return "Task Creada";
    }

    updateTask(id: string, task: TaskDTO): Promise<any> {
        // 1- forma Rapida de Actualizar
        // return this.taskModel.updateOne({ '_id': id }, task).catch(error => { console.log(error); return false })

        // 2- Forma mas util - Por que nos permite Obtener la Task Que se Actualiza
        return this.taskModel.findById(id).then(t => {
            t.title = task.title;
            t.description = task.description;
            t.done = task.done;
            return t.save();
        }).catch(error => {
            console.log("Error Update Task", error);
            return "Tuvimos un pequeño problema al actualizar la Task"
        })
    }

    async deleteTask(id: string): Promise<any> {
        // return this.taskModel.findByIdAndRemove(id)  // DEPRECADO  // retorna la TASK  y elimina
        
        // return this.taskModel.findByIdAndDelete(id)  // OK         // retorna la TASK  y elimina
        return this.taskModel.deleteOne({ '_id': id })  // solo Elimina
    }




}

import { Document } from 'mongoose';

// Extendemos de Document de Mongoose para usarlo como interface o Documento de Mongo en 'taskService'
export interface Task extends Document {
    id?: number;
    title: string;
    description: string;
    done: boolean;
}
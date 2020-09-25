import { RequestHandler } from 'express';
import { Todo } from '../models/Todo';

const todos: Todo[] = [];

export const createTodo: RequestHandler = (request, response, next) => {
    const text = (request.body as { text: string }).text;
    const newTodo = new Todo(Math.random().toString(), text);
    console.log(newTodo);
    todos.push(newTodo);

    response.status(201).json({ message: 'created todo', createdTodo: newTodo });
};

export const getTodos: RequestHandler = (request, response, next) => {
    response.status(201).json({ todos });
};

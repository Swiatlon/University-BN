import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { IStudentTodo } from 'types/studentTodo/IStudentTodo';
import { Type } from 'class-transformer';

export interface IStudentTodoDto extends Omit<IStudentTodo, 'id' | 'student'> {
    student: number;
}

export class StudentTodoDto implements IStudentTodoDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    color!: string;

    @IsNotEmpty()
    student!: number;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    endDate: Date;
}

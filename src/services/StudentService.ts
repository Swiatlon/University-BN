import { AppDataSource } from 'configs/database';
import { Repository } from 'typeorm';
import { Student } from 'entities/StudentEntity';

export class StudentService {
    private studentRepository: Repository<Student>;

    constructor() {
        this.studentRepository = AppDataSource.getRepository(Student);
    }

    async createStudent(studentData: Partial<Student>): Promise<Student> {
        const student = this.studentRepository.create(studentData);
        return this.studentRepository.save(student);
    }
}

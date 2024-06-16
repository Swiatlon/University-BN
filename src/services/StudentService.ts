import { AppDataSource } from 'configs/database';
import { Student } from 'entities/Students/StudentEntity';
import { Repository } from 'typeorm';
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

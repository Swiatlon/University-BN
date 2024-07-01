import { AppDataSource } from 'configs/database';
import { Student } from 'entities/Students/Student.Entity';
import { IStudentService } from 'interfaces/Services/IServices';
import { Repository } from 'typeorm';
export class StudentService implements IStudentService {
    private studentRepository: Repository<Student>;

    constructor() {
        this.studentRepository = AppDataSource.getRepository(Student);
    }

    async createStudent(studentData: Partial<Student>): Promise<Student> {
        const student = this.studentRepository.create(studentData);
        return this.studentRepository.save(student);
    }
}

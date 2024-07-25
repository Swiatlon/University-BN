import { AppDataSource } from 'configs/database';
import { Student } from 'entities/Students/Student.Entity';
import { StudentRepository } from 'repositories/Persons/Student.Repository';
import { Repository } from 'typeorm';
import { IStudentService } from 'types/Services/Services.Interfaces';

export class StudentService implements IStudentService {
    private studentRepository: Repository<Student>;

    constructor() {
        this.studentRepository = AppDataSource.getRepository(Student);
    }

    async createStudent(studentData: Partial<Student>): Promise<Student> {
        const student = this.studentRepository.create(studentData);
        return this.studentRepository.save(student);
    }

    async getStudentAllData(studentId: string): Promise<Student | null> {
        const studentData = await StudentRepository().getStudentAllData(studentId);
        return studentData;
    }
}

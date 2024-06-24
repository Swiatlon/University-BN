import { DataSource, Repository } from 'typeorm';
import { DegreeCourseFactory } from 'factories/Courses/DegreeCourse.Factory';
import { DegreePathFactory } from 'factories/Courses/DegreePath.Factory';
import { ModuleFactory } from 'factories/Courses/Module.Factory';
import { SubjectFactory } from 'factories/Courses/Subject.Factory';
import { ParsedRowData } from './DataParser';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { Module } from 'entities/Courses/Module.Entity';
import { Subject } from 'entities/Courses/Subject.Entity';

export class DataSaver {
    private degreeCourseFactory = new DegreeCourseFactory();
    private degreePathFactory = new DegreePathFactory();
    private moduleFactory = new ModuleFactory();
    private subjectFactory = new SubjectFactory();

    private degreeCourseRepository: Repository<DegreeCourse>;
    private degreePathRepository: Repository<DegreePath>;
    private moduleRepository: Repository<Module>;
    private subjectRepository: Repository<Subject>;

    constructor(dataSource: DataSource) {
        this.degreeCourseRepository = dataSource.getRepository(DegreeCourse);
        this.degreePathRepository = dataSource.getRepository(DegreePath);
        this.moduleRepository = dataSource.getRepository(Module);
        this.subjectRepository = dataSource.getRepository(Subject);
    }

    public async saveParsedData(parsedData: ParsedRowData[]): Promise<void> {
        for (const row of parsedData) {
            const degreeCourse = await this.findOrCreateDegreeCourse(row.degreeCourse);
            const degreePath = await this.findOrCreateDegreePath(row.degreePath, degreeCourse);

            if (row.module === 'Kierunkowy') {
                const subject = await this.findOrCreateSubject(row.subject);
                await this.addSubjectToDegreeCourseIfNotExist(subject, degreeCourse);
                continue;
            }

            const module = await this.findOrCreateModule(row.module, degreePath);
            await this.findOrCreateSubject(row.subject, module);
        }
    }

    private async findOrCreateDegreeCourse(name: string): Promise<DegreeCourse> {
        let degreeCourse = await this.degreeCourseRepository.findOne({ where: { name }, relations: ['subjects'] });

        if (!degreeCourse) {
            degreeCourse = this.degreeCourseFactory.create(name);
            degreeCourse.subjects = []; // Initialize the subjects array
            degreeCourse = await this.degreeCourseRepository.save(degreeCourse);
        } else if (!degreeCourse.subjects) {
            degreeCourse.subjects = [];
        }

        return degreeCourse;
    }

    private async findOrCreateDegreePath(name: string, degreeCourse: DegreeCourse): Promise<DegreePath> {
        let degreePath = await this.degreePathRepository.findOne({ where: { name } });

        if (!degreePath) {
            degreePath = this.degreePathFactory.create(name, degreeCourse);
            degreePath = await this.degreePathRepository.save(degreePath);
        }

        return degreePath;
    }

    private async findOrCreateModule(name: string, degreePath: DegreePath): Promise<Module> {
        let module = await this.moduleRepository.findOne({ where: { name } });

        if (!module) {
            module = this.moduleFactory.create(name, degreePath);
            module = await this.moduleRepository.save(module);
        }

        return module;
    }

    private async findOrCreateSubject(name: string, module?: Module): Promise<Subject> {
        let subject = await this.subjectRepository.findOne({ where: { name }, relations: ['modules'] });

        if (!subject) {
            subject = this.subjectFactory.create(name, module);
            return await this.subjectRepository.save(subject);
        }

        if (module && !subject.modules.some((mod) => mod.id === module.id)) {
            subject.modules.push(module);
            await this.subjectRepository.save(subject);
        }

        return subject;
    }

    private async addSubjectToDegreeCourseIfNotExist(subject: Subject, degreeCourse: DegreeCourse): Promise<void> {
        if (!degreeCourse.subjects.some((sub) => sub.id === subject.id)) {
            degreeCourse.subjects.push(subject);
            await this.degreeCourseRepository.save(degreeCourse);
        }
    }
}

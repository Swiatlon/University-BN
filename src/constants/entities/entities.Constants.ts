export enum GenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}
export const genderEnumArray = Object.values(GenderEnum);

export enum RolesEnum {
    ADMIN = 'ADMIN',
    USER = 'USER',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
    EMPLOYEE = 'EMPLOYEE',
    EXTERNAL_PARTICIPANT = 'EXTERNAL_PARTICIPANT',
    COMPANY = 'COMPANY',
}
export const rolesEnumArray = Object.values(RolesEnum);

export enum EventOrganizerTypeEnum {
    EMPLOYEE = RolesEnum.EMPLOYEE,
    EXTERNAL_PARTICIPANT = RolesEnum.EXTERNAL_PARTICIPANT,
    COMPANY = RolesEnum.COMPANY,
}
export const eventOrganizerTypeEnumArray = Object.values(EventOrganizerTypeEnum);

export enum GradeValueEnum {
    Poor = 2,
    Fair = 3,
    Good = 4,
    Excellent = 5,
}
export const gradeValueEnumArray = Object.values(GradeValueEnum).filter(Number) as GradeValueEnum[];

export enum PassDateAttemptEnum {
    FirstAttempt = 1,
    SecondAttempt = 2,
    ThirdAttempt = 3,
    FourthAttempt = 4,
}
export const passDateAttemptEnumArray = Object.values(PassDateAttemptEnum).filter(Number) as PassDateAttemptEnum[];

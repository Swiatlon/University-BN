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

import { faker } from '@faker-js/faker';

export function generatePhoneNumber(): string {
    const amountOfElements = 3;

    const areaCode = faker.string.numeric(amountOfElements);
    const centralOfficeCode = faker.string.numeric(amountOfElements);
    const lineNumber = faker.string.numeric(amountOfElements);

    return `${areaCode}-${centralOfficeCode}-${lineNumber}`;
}

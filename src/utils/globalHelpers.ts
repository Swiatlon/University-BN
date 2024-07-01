import bcrypt from 'bcrypt';

const maxRounds = 10;

export async function hashPassword(password: string, saltRounds?: number): Promise<string> {
    const defaultRounds = process.env.NODE_ENV === 'production' ? maxRounds : 1;

    return await bcrypt.hash(password, saltRounds ?? defaultRounds);
}

export function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function getRandomElements<T>(array: T[], count: number): T[] {
    const result = [];
    const arrayCopy = array.map((item) => item);

    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * arrayCopy.length);
        result.push(arrayCopy.splice(index, 1)[0]);
    }

    return result;
}

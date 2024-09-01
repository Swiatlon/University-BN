import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export type TSearchQuery = { lookupText: string; searchAllFields: boolean; fields?: never } | { lookupText: string; fields: string[]; searchAllFields?: never };

export type TFilterFunction<T extends ObjectLiteral> = (queryBuilder: SelectQueryBuilder<T>) => SelectQueryBuilder<T>;

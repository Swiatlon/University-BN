import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export interface IPagination {
    page: number;
    pageSize: number;
}

export interface IRequestParams {
    pagination?: IPagination;
    search?: SearchQuery;
    selectFields?: string[];
}

export type SearchQuery = { lookupText: string; searchAllFields: boolean; fields?: never } | { lookupText: string; fields: string[]; searchAllFields?: never };
export type FilterFunction<T extends ObjectLiteral> = (queryBuilder: SelectQueryBuilder<T>) => SelectQueryBuilder<T>;

import { getSearch } from 'contexts/RequestContext';
import { SearchQuery } from 'interfaces/Utils/IUtils';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

const isFieldSearch = (search: SearchQuery): search is { lookupText: string; fields: string[] } => {
    return search && 'lookupText' in search && Array.isArray(search.fields);
};

export const applyFieldSearch = <T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T> => {
    const search = getSearch() as SearchQuery;

    if (isFieldSearch(search)) {
        const alias = queryBuilder.alias;
        const conditions: string[] = [];
        const parameters: Record<string, string> = {};

        search.fields.forEach((field) => {
            parameters[field] = `%${search.lookupText}%`;
            conditions.push(`${alias}.${field} ILIKE :${field}`);
        });

        return queryBuilder.andWhere(`(${conditions.join(' OR ')})`, parameters);
    }

    return queryBuilder;
};

const isAllFieldsSearch = (search: SearchQuery): search is { lookupText: string; searchAllFields: boolean } => {
    return search && 'lookupText' in search && search.searchAllFields === true;
};

export const applyAllFieldsSearch = <T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T> => {
    const search = getSearch() as SearchQuery;

    if (isAllFieldsSearch(search)) {
        const alias = queryBuilder.alias;
        const allFields = queryBuilder.connection.getMetadata(alias).columns.map((col) => col.propertyName);
        const conditions = allFields.map((field) => `${alias}.${field} ILIKE :search`);

        return queryBuilder.andWhere(`(${conditions.join(' OR ')})`, { search: `%${search.lookupText}%` });
    }

    return queryBuilder;
};

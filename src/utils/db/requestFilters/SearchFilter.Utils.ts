import { getSearch } from 'contexts/RequestContext';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { TSearchQuery } from 'types/requests/Requests.Types';

const isFieldSearch = (search: TSearchQuery): search is { lookupText: string; fields: string[] } => {
    return search && 'lookupText' in search && Array.isArray(search.fields);
};

export const applyFieldSearch = <T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T> => {
    const search = getSearch() as TSearchQuery;

    if (isFieldSearch(search)) {
        const alias = queryBuilder.alias;
        const conditions: string[] = [];
        const parameters: Record<string, string> = {};

        search.fields.forEach((field) => {
            parameters[field] = `%${search.lookupText}%`;
            conditions.push(`${alias}.${field} LIKE :${field}`);
        });

        return queryBuilder.andWhere(`(${conditions.join(' OR ')})`, parameters);
    }

    return queryBuilder;
};

const isAllFieldsSearch = (search: TSearchQuery): search is { lookupText: string; searchAllFields: boolean } => {
    return search && 'lookupText' in search && search.searchAllFields === true;
};

export const applyAllFieldsSearch = <T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T> => {
    const search = getSearch() as TSearchQuery;

    if (isAllFieldsSearch(search)) {
        const alias = queryBuilder.alias;
        const mainAlias = queryBuilder.expressionMap.mainAlias;
        const allFields = mainAlias?.metadata.columns.filter((col) => col.type === String).map((col) => col.propertyName) ?? [];
        const conditions = allFields.map((field) => `Lower(${alias}.${field}) LIKE :search`);
        const query = queryBuilder.andWhere(`(${conditions.join(' OR ')})`, { search: `%${search.lookupText.toLowerCase()}%` });

        return query;
    }

    return queryBuilder;
};

import { SelectQueryBuilder, ObjectLiteral } from 'typeorm';
import { getSelectFields } from 'contexts/RequestContext';

export const applySelectFields = <T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T> => {
    const selectFields = getSelectFields();
    const alias = queryBuilder.alias;

    if (selectFields) {
        queryBuilder.select(selectFields.map((field) => `${alias}.${field}`));
    }

    return queryBuilder;
};

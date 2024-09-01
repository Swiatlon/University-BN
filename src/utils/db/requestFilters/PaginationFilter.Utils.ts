import { SelectQueryBuilder, ObjectLiteral } from 'typeorm';
import { getPagination } from 'contexts/RequestContext';

export const applyPagination = <T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T> => {
    const pagination = getPagination();

    if (pagination) {
        const { page, pageSize } = pagination;
        queryBuilder.limit(pageSize).offset((page - 1) * pageSize);
    }

    return queryBuilder;
};

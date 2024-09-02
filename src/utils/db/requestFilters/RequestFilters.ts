import { SelectQueryBuilder, ObjectLiteral } from 'typeorm';
import { applyPagination } from './PaginationFilter.Utils';
import { applyFieldSearch, applyAllFieldsSearch } from './SearchFilter.Utils';
import { applySelectFields } from './SelectFilter.Utils';
import { getPagination } from 'contexts/RequestContext';
import { TFilterFunction } from 'types/requests/Requests.Types';

const applyFilters = <T extends ObjectLiteral>(filters: TFilterFunction<T>[]): TFilterFunction<T> => {
    return (queryBuilder: SelectQueryBuilder<T>) => {
        return filters.reduce((currentQueryBuilder, filter) => {
            return filter(currentQueryBuilder);
        }, queryBuilder);
    };
};

export const applyFiltersToQuery = async <T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): Promise<{ items: T[]; count?: number }> => {
    const filters: TFilterFunction<T>[] = [applyPagination, applyFieldSearch, applyAllFieldsSearch, applySelectFields];
    const filteredQueryBuilder = applyFilters(filters)(queryBuilder);
    const pagination = getPagination();

    if (pagination) {
        const [items, count] = await filteredQueryBuilder.getManyAndCount();
        return { items, count };
    }

    const items = await filteredQueryBuilder.getMany();
    return { items };
};

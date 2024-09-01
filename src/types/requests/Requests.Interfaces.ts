import { TSearchQuery } from './Requests.Types';

export interface IPagination {
    page: number;
    pageSize: number;
}

export interface IRequestParams {
    pagination?: IPagination;
    search?: TSearchQuery;
    selectFields?: string[];
}

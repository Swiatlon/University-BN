import { createNamespace, getNamespace } from 'cls-hooked';
import { IPagination, IRequestParams, SearchQuery } from 'interfaces/Utils/IUtils';

const REQUEST_NAMESPACE = 'request';

export const getRequestContext = () => {
    return getNamespace(REQUEST_NAMESPACE) ?? createNamespace(REQUEST_NAMESPACE);
};

export const getPagination = (): IPagination | undefined => {
    const context = getRequestContext();
    const request = context.get('request') as IRequestParams | undefined;

    return request?.pagination;
};

export const getSearch = (): SearchQuery | undefined => {
    const context = getRequestContext();
    const request = context.get('request') as IRequestParams | undefined;

    return request?.search;
};

export const getSelectFields = (): string[] | undefined => {
    const context = getRequestContext();
    const request = context.get('request') as IRequestParams | undefined;

    return request?.selectFields;
};

export const getRequestContextAllFields = (): IRequestParams | undefined => {
    const context = getRequestContext();
    const request = context.get('request') as IRequestParams | undefined;

    return request;
};

import { getNamespace, createNamespace } from 'cls-hooked';
import { getRequestContext, getPagination, getSearch, getSelectFields, getRequestContextAllFields } from 'contexts/RequestContext';
import { IRequestParams } from 'types/Requests/Requests.Interfaces';

jest.mock('cls-hooked', () => ({
    getNamespace: jest.fn(),
    createNamespace: jest.fn(),
}));

describe('Request Context Functions', () => {
    const mockContext = { get: jest.fn() };
    const mockRequest: IRequestParams = {
        pagination: { page: 1, pageSize: 10 },
        search: { lookupText: 'test', searchAllFields: true },
        selectFields: ['field1', 'field2'],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (getNamespace as jest.Mock).mockReturnValue(mockContext);
    });

    describe('getRequestContext', () => {
        it('returns existing namespace if present', () => {
            const namespace = getRequestContext();
            expect(namespace).toBe(mockContext);
        });

        it('creates new namespace if not present', () => {
            (getNamespace as jest.Mock).mockReturnValue(undefined);
            (createNamespace as jest.Mock).mockReturnValue(mockContext);

            const namespace = getRequestContext();
            expect(namespace).toBe(mockContext);
        });
    });

    const testCases = [
        { method: getPagination, key: 'pagination', expected: mockRequest.pagination },
        { method: getSearch, key: 'search', expected: mockRequest.search },
        { method: getSelectFields, key: 'selectFields', expected: mockRequest.selectFields },
        { method: getRequestContextAllFields, key: '', expected: mockRequest },
    ];

    testCases.forEach(({ method, key, expected }) => {
        describe(`${method.name}`, () => {
            it(`returns ${key || 'all request fields'} from request context`, () => {
                mockContext.get.mockReturnValue(mockRequest);
                const result = method();
                expect(result).toEqual(expected);
            });

            it('returns undefined if no request in context', () => {
                mockContext.get.mockReturnValue(undefined);
                const result = method();
                expect(result).toBeUndefined();
            });
        });
    });
});

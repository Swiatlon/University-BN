declare namespace Express {
    interface Request {
        params: {
            id?: number;
        };
        query: {
            pagination?: {
                page?: number;
                pageSize?: number;
            };
            search?: {
                lookupText: string;
                fields?: string[];
                searchAllFields?: boolean;
            };
            selectFields?: string[];
        };
    }
}

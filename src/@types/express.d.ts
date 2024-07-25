declare namespace Express {
    interface Request {
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

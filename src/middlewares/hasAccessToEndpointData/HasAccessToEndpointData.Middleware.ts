import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from 'constants/general/general.Constants';
import { ICookie } from 'types/global/Global.Interfaces';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { AppDataSource } from 'configs/database';
import { ApiError } from 'middlewares/apiErrors/ApiError';

interface IAccountResult {
    findedAccountId: number;
}

const { UNAUTHORIZED, FORBIDDEN } = HTTP_STATUS;

const hasAccessToEndpointData = <Entity>(allowedRoles: RolesEnum[], entityClass?: { new (): Entity }) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const {
                loggedUserData: { accountId, roles },
            } = req.cookies as ICookie;
            const requestId = Number(req.params.id);

            if (!roles || !roles.some((role) => allowedRoles.includes(role))) {
                throw new ApiError(UNAUTHORIZED.code, UNAUTHORIZED.message);
            }

            if (roles.includes(RolesEnum.ADMIN)) {
                return next();
            }

            if (!entityClass) {
                return next();
            }

            const repository = AppDataSource.getRepository(entityClass);
            const rawResult = (await repository
                .createQueryBuilder('entity')
                .leftJoin('entity.account', 'account')
                .select('account.id', 'findedAccountId')
                .where('entity.id = :requestId', { requestId })
                .getRawOne()) as IAccountResult | null;

            const findedAccountId = rawResult ? rawResult.findedAccountId : null;

            if (findedAccountId !== accountId) {
                throw new ApiError(FORBIDDEN.code, 'You are not authorized to access this resource');
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

export default hasAccessToEndpointData;

import { Response, NextFunction, Request } from 'express';
import { HTTP_STATUS } from 'constants/general/general.Constants';
import { ICookie } from 'types/global/Global.Interfaces';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { ApiError } from 'middlewares/apiErrors/ApiError';

const { UNAUTHORIZED } = HTTP_STATUS;

const hasAccessToEndpointData = (allowedRoles: RolesEnum[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const {
            loggedUserData: { accountId: loggedAccountId, roles },
        } = req.cookies as ICookie;

        const requestedAccountId = Number(req.query.accountId);

        if (!roles || !roles.some((role) => allowedRoles.includes(role))) {
            throw new ApiError(UNAUTHORIZED.code, UNAUTHORIZED.message);
        }

        if (roles.includes(RolesEnum.ADMIN)) {
            return next();
        }

        if (requestedAccountId && loggedAccountId === requestedAccountId) {
            return next();
        }

        throw new ApiError(UNAUTHORIZED.code, UNAUTHORIZED.message);
    };
};

export default hasAccessToEndpointData;

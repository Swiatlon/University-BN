import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AccountRepository } from 'repositories/Accounts/Accounts.Repository';
import { ILoginCredentials } from 'types/Controllers/Controllers.Interfaces';
import { IUserPayload } from 'types/Global/Global.Interfaces';
import { LONGER_ACCESS_TOKEN_TIME, LONGER_REFRESH_TOKEN_TIME, SHORT_ACCESS_TOKEN_TIME, SHORT_REFRESH_TOKEN_TIME } from 'constants/general/general.Constants';
import { IAuthService } from 'types/Services/Services.Interfaces';

export class AuthService implements IAuthService {
    async login({ identifier, password, rememberMe, sessionID }: ILoginCredentials) {
        const foundUser = await AccountRepository().findByIdentifierAccount(identifier);

        if (!foundUser) {
            throw new Error('Not found user!');
        }

        const match = bcrypt.compareSync(password, foundUser.password);

        if (!match) {
            throw new Error('Password or identifier not correct!');
        }

        const accessToken = jwt.sign(
            {
                roles: foundUser.roles.map((role) => role.name),
            },
            String(process.env.ACCESS_TOKEN_SECRET),
            {
                expiresIn: rememberMe ? LONGER_ACCESS_TOKEN_TIME : SHORT_ACCESS_TOKEN_TIME,
            }
        );

        const refreshToken = jwt.sign(
            {
                email: foundUser.email,
            },
            String(process.env.REFRESH_TOKEN_SECRET),
            { expiresIn: rememberMe ? LONGER_REFRESH_TOKEN_TIME : SHORT_REFRESH_TOKEN_TIME }
        );

        const userData = {
            accountId: foundUser.id,
            roles: foundUser.roles.map((role) => role.name),
        };

        return { accessToken, refreshToken, userData, sessionData: { sessionID, rememberMe } };
    }

    async refresh(refreshToken: string, sessionID: string, loginSavedSessionID: string, rememberMe: boolean) {
        const decoded = await new Promise<IUserPayload>((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, decodedToken) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decodedToken as IUserPayload);
                }
            });
        });

        const foundUser = await AccountRepository().findByIdentifierAccount(decoded.email);

        if (!foundUser) {
            throw new Error('Unauthorized');
        }

        if (!rememberMe && sessionID !== loginSavedSessionID) {
            throw new Error('Multi-session detected');
        }

        const accessToken = jwt.sign(
            {
                roles: foundUser.roles.map((role) => role.name),
            },
            String(process.env.ACCESS_TOKEN_SECRET),
            {
                expiresIn: rememberMe ? LONGER_ACCESS_TOKEN_TIME : SHORT_ACCESS_TOKEN_TIME,
            }
        );

        return { accessToken };
    }
}

export const authService = new AuthService();

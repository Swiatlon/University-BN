import express from 'express';
import { loginLimiter } from 'middlewares/LoginLimiter';
import { AuthController } from 'controllers/Auth.Controller';
import { validateDto } from 'middlewares/ValidateDto';
import { AccountCredentialsDto } from 'dto/userAccount/CreateUserAccount.Dto';

const router = express.Router();

router.route('/login').post(validateDto(AccountCredentialsDto), loginLimiter, AuthController.login);

router.route('/refresh').post(AuthController.refreshSession);

router.route('/logout').post(AuthController.logout);

router.route('/random-login').post(AuthController.randomUserLogin);

export default router;

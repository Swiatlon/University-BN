import express from 'express';
import { loginLimiter } from 'middlewares/loginLimiter';
import { AuthController } from 'controllers/Auth.Controller';
import { validateDto } from 'middlewares/validateDto';
import { CreateUserAccountDto } from 'dto/userAccount/CreateUserAccount.Dto';

const router = express.Router();

router.route('/').post(validateDto(CreateUserAccountDto), loginLimiter, AuthController.login);

router.route('/refresh').post(AuthController.refresh);

router.route('/logout').post(AuthController.logout);

router.route('/random-login').post(AuthController.randomUserLogin);

export default router;

import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  registerValidation,
  loginValidation,
} from './auth.validation';

const authService = new AuthService();

export class AuthController {
  /**
   * POST /auth/register
   */
  async register(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { error, value } =
        registerValidation.validate(req.body);

      if (error) {
        res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
        return;
      }

      const {
        email,
        password,
        role,
      } = value;

      const user = await authService.register(
        email,
        password,
        role
      );

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  /**
   * POST /auth/login
   */
  async login(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { error, value } =
        loginValidation.validate(req.body);

      if (error) {
        res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
        return;
      }

      const { email, password } = value;

      const result =
        await authService.login(
          email,
          password
        );

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (err: any) {
      res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  }
}
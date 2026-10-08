import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginAdmin(
      email,
      password
    );

    const preMfaSession =
      authService.createPreMfaSession(
        result.user.id,
        result.user.email,
        result.user.role
      );

      

    res.cookie(
      "pre_mfa_session",
      "pending_mfa_verification",
      {
        httpOnly: false,
        sameSite: "lax",
        secure: false,
        maxAge: 10 * 60 * 1000,
      }
    );

    return res.status(200).json({
      status: "success",
      message: "MFA verification required",
      data: {
        user: result.user,
        mfaRequired: true,
        preMfaSession,
      },
    });

  } catch (error: any) {
    return res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};

export const verifyMfa = async (
  req: Request,
  res: Response
  
) => {
  try {
    const {
      userId,
      email,
      role,
      code,
    } = req.body;

    if (code !== "3075") {
      return res.status(401).json({
        status: "error",
        message: "Invalid MFA code",
      });
    }

    const adminSession =
      authService.createAdminSession(
        userId,
        email,
        role
      );

      

    res.cookie(
      "adm_sess",
      adminSession,
      {
        httpOnly: false,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }
    );

    return res.status(200).json({
      status: "success",
      message: "MFA verification successful",
    });

  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};''

export const profile = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user as {
      id: string;
      email: string;
      role: string;
    };

    const profile = await authService.getProfileAdmin(
      user.id
    );

    return res.status(200).json({
      status: "success",
      data: profile,
    });

  } catch (error: any) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
import { Request, Response } from "express";
import { Role } from "@prisma/client";
import * as userService from "../services/users.service";

/**
 * GET ALL USERS
 */
export const getAllUsers = async (
  req: Request,
  res: Response
) => {

  try {

    const page =
      Number(req.query.page) || 1;


    const limit =
      Number(req.query.limit) || 10;


    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;



    const result =
      await userService.getAllUsers(
        page,
        limit,
        search
      );



    return res.status(200).json({

      status: "success",

      ...result,

    });


  } catch (error: any) {


    return res.status(500).json({

      status: "error",

      message: error.message,

    });


  }

};

/**
 * GET USER BY ID
 */
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * CREATE USER
 */
export const createUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await userService.createUser(
      name,
      email,
      password,
      role as Role
    );

    return res.status(201).json({
      success: true,
      message: "User berhasil dibuat",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // Prevent changing own role
    if (req.user?.id === id && role && role !== req.user.role) {
      return res.status(400).json({
        success: false,
        message: "Anda tidak dapat mengubah role akun sendiri",
      });
    }

    const user = await userService.updateUser(
      id,
      name,
      email,
      role as Role
    );

    return res.status(200).json({
      success: true,
      message: "User berhasil diperbarui",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Prevent self-delete
    if (req.user?.id === id) {
      return res.status(400).json({
        success: false,
        message: "Anda tidak dapat menghapus akun sendiri",
      });
    }

    const result = await userService.deleteUser(id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
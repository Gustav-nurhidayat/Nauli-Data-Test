import { Request, Response } from "express";
import * as categoryService from "../services/category.service";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const category = await categoryService.createCategory(name);

    return res.status(201).json({
      status: "success",
      message: "Kategori berhasil dibuat",
      data: category,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response
) => {

  try {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const result =
      await categoryService.getAllCategories(
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

export const getCategoryById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const category = await categoryService.getCategoryById(id);

    return res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);
    const { name } = req.body;

    const category = await categoryService.updateCategory(
      id,
      name
    );

    return res.status(200).json({
      status: "success",
      message: "Kategori berhasil diperbarui",
      data: category,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const id  = String(req.params.id);

    await categoryService.deleteCategory(id);

    return res.status(200).json({
      status: "success",
      message: "Kategori berhasil dihapus",
    });
  } catch (error: any) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
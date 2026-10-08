import { Request, Response } from "express";
import * as articleService from "../services/article.service";
import { ArticleStatus } from "@prisma/client";

import {
  CreateArticleDto,
  UpdateArticleDto,
  ArticleQueryDto,
} from "../types/article";

export const createArticle = async (
  req: Request,
  res: Response
) => {
  try {
    const body: CreateArticleDto = req.body;

    const authorId = req.user.id;

    const article = await articleService.createArticle(
      body,
      authorId
    );

    return res.status(201).json({
      status: "success",
      message: "Artikel berhasil dibuat",
      data: article,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getAllArticles = async (
  req: Request,
  res: Response
) => {
  try {
    const query: ArticleQueryDto = {
  page: Number(req.query.page) || 1,
  limit: Number(req.query.limit) || 10,

  search: req.query.search as string | undefined,
  categoryId: req.query.categoryId as string | undefined,

  status: req.query.status as ArticleStatus | undefined,

  sortBy: req.query.sortBy as ArticleQueryDto["sortBy"],
  sortOrder: req.query.sortOrder as ArticleQueryDto["sortOrder"],
};

   const isAdmin = !!req.user;

const articles = await articleService.getAllArticles(
  query,
  isAdmin
);
    return res.status(200).json({
      status: "success",
      ...articles,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getArticleById = async (
  req: Request,
  res: Response
) => {
  try {
    const isAdmin = !!req.user;

const article = await articleService.getArticleById(
  req.params.id as string,
  isAdmin
);

    return res.status(200).json({
      status: "success",
      data: article,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateArticle = async (
  req: Request,
  res: Response
) => {
  try {
    const body: UpdateArticleDto = req.body;

    const article = await articleService.updateArticle(
      req.params.id as string,
      body
    );

    return res.status(200).json({
      status: "success",
      message: "Artikel berhasil diperbarui",
      data: article,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteArticle = async (
  req: Request,
  res: Response
) => {
  try {
    await articleService.deleteArticle(
      req.params.id as string
    );

    return res.status(200).json({
      status: "success",
      message: "Artikel berhasil dihapus",
    });
  } catch (error: any) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const publishArticle = async (
  req: Request,
  res: Response
) => {
  try {
    const article = await articleService.publishArticle(
      req.params.id as string
    );

    return res.status(200).json({
      status: "success",
      message: "Artikel berhasil dipublish",
      data: article,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const draftArticle = async (
  req: Request,
  res: Response
) => {
  try {
    const article = await articleService.draftArticle(
      req.params.id as string
    );

    return res.status(200).json({
      status: "success",
      message: "Artikel berhasil dijadikan draft",
      data: article,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
import { Request, Response } from "express";
import * as serviceService from "../services/service.service";

import {
  CreateServiceDto,
  UpdateServiceDto,
  ServiceQueryDto,
} from "../types/service";

export const createService = async (
  req: Request,
  res: Response
) => {
  try {
    const data: CreateServiceDto = req.body;

    const service = await serviceService.createService(data);

    return res.status(201).json({
      status: "success",
      data: service,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getAllServices = async (
  req: Request,
  res: Response
) => {
  try {
    const query: ServiceQueryDto = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,

      search: req.query.search as string | undefined,

      isActive:
        req.query.isActive !== undefined
          ? req.query.isActive === "true"
          : undefined,

      sortBy: req.query.sortBy as ServiceQueryDto["sortBy"],
      sortOrder: req.query.sortOrder as ServiceQueryDto["sortOrder"],
    };

    const services = await serviceService.getAllServices(query);

    return res.status(200).json({
      status: "success",
      ...services,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getServiceById = async (
  req: Request,
  res: Response
) => {
  try {
    const service = await serviceService.getServiceById(
      req.params.id as string
    );

    return res.status(200).json({
      status: "success",
      data: service,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateService = async (
  req: Request,
  res: Response
) => {
  try {
    const data: UpdateServiceDto = req.body;

    const service = await serviceService.updateService(
      req.params.id as string,
      data
    );

    return res.status(200).json({
      status: "success",
      data: service,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteService = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await serviceService.deleteService(
      req.params.id as string
    );

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }

};

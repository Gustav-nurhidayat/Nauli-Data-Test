import prisma from "../config/database";
import { Prisma } from "@prisma/client";
import { createSlug } from "../utils/slug";

import {
  CreateServiceDto,
  ServiceQueryDto,
 UpdateServiceDto,
} from "../types/service";

const serviceSelect = {
  id: true,
  title: true,
  slug: true,
  shortDescription: true,
  description: true,
  icon: true,
  thumbnail: true,
  order: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

export const createService = async (
  data: CreateServiceDto
) => {
  const slug = createSlug(data.title);

  const existing = await prisma.service.findUnique({
    where: {
      slug,
    },
  });

  if (existing) {
    throw new Error("Service already exists");
  }

  return prisma.service.create({
    data: {
      title: data.title,
      slug,
      shortDescription: data.shortDescription,
      description: data.description,
      icon: data.icon,
      thumbnail: data.thumbnail,
    },

    select: serviceSelect,
  });
};

export const getAllServices = async (
  query: ServiceQueryDto
) => {
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);

  const skip = (page - 1) * limit;

  const where: Prisma.ServiceWhereInput = {};

  if (query.search) {
    where.OR = [
      {
        title: {
          contains: query.search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        shortDescription: {
          contains: query.search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        description: {
          contains: query.search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
    ];
  }

  if (query.isActive !== undefined) {
    where.isActive = query.isActive;
  }

  const total = await prisma.service.count({
    where,
  });

  const services = await prisma.service.findMany({
    where,

    skip,
    take: limit,

    orderBy: {
      [query.sortBy ?? "order"]:
        query.sortOrder ?? "asc",
    },

    select: serviceSelect,
  });

  return {
    data: services,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getServiceById = async (
  id: string
) => {
  const service = await prisma.service.findUnique({
    where: {
      id,
    },

    select: serviceSelect,
  });

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};

export const updateService = async (
  id: string,
  data: UpdateServiceDto
) => {
  const existingService = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!existingService) {
    throw new Error("Service not found");
  }

  let slug = existingService.slug;

  if (
    data.title &&
    data.title !== existingService.title
  ) {
    slug = createSlug(data.title);

    const duplicate = await prisma.service.findFirst({
      where: {
        slug,
        NOT: {
          id,
        },
      },
    });

    if (duplicate) {
      throw new Error("Service title already exists");
    }
  }

  return prisma.service.update({
    where: {
      id,
    },

    data: {
      ...(data.title !== undefined && {
        title: data.title,
      }),

      ...(data.title !== undefined && {
        slug,
      }),

      ...(data.shortDescription !== undefined && {
        shortDescription: data.shortDescription,
      }),

      ...(data.description !== undefined && {
        description: data.description,
      }),

      ...(data.icon !== undefined && {
        icon: data.icon,
      }),

      ...(data.thumbnail !== undefined && {
        thumbnail: data.thumbnail,
      }),

      ...(data.order !== undefined && {
        order: data.order,
      }),

      ...(data.isActive !== undefined && {
        isActive: data.isActive,
      }),
    },

    select: serviceSelect,
  });
};

export const deleteService = async (
  id: string
) => {
  const existing = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    throw new Error("Service not found");
  }

  await prisma.service.delete({
    where: {
      id,
    },
  });

  return {
    message: "Service deleted successfully",
  };

};


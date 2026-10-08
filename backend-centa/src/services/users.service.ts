import prisma from "../config/database";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";


export const getAllUsers = async (
  page = 1,
  limit = 10,
  search?: string
) => {

  const skip = (page - 1) * limit;


  const where = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {};



  const [users, total] = await Promise.all([

    prisma.user.findMany({

      where,

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,

      take: limit,

    }),


    prisma.user.count({
      where,
    }),

  ]);



  return {

    data: users,

    pagination: {

      total,

      page,

      limit,

      totalPages: Math.ceil(
        total / limit
      ),

    },

  };

};





export const getUserById = async (
  id: string
) => {


  const user =
    await prisma.user.findUnique({

      where:{
        id,
      },

      select:{
        id:true,
        name:true,
        email:true,
        role:true,
        createdAt:true,
        updatedAt:true,
      },

    });



  if(!user){

    throw new Error(
      "User tidak ditemukan"
    );

  }



  return user;

};





export const createUser = async (

  name:string,

  email:string,

  password:string,

    role?:Role


)=>{


  const existing =
    await prisma.user.findUnique({

      where:{
        email,
      },

    });



  if(existing){

    throw new Error(
      "Email sudah digunakan"
    );

  }



  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );



  return prisma.user.create({

    data:{

      name,

      email,

      password:hashedPassword,

      role: role ?? Role.ADMIN,

    },


    select:{

      id:true,

      name:true,

      email:true,

      role:true,

      createdAt:true,

      updatedAt:true,

    },

  });


};







export const updateUser = async (
  id: string,
  name: string,
  email: string,
  role?: Role
) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const duplicate = await prisma.user.findFirst({
    where: {
      email,
      NOT: {
        id,
      },
    },
  });

  if (duplicate) {
    throw new Error("Email sudah digunakan");
  }

  return prisma.user.update({
    where: {
      id,
    },

    data: {
      name,
      email,
      ...(role !== undefined && {
        role,
      }),
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};







export const deleteUser = async (
 id:string
)=>{


 const user =
 await prisma.user.findUnique({

  where:{
    id,
  },

 });



 if(!user){

  throw new Error(
    "User tidak ditemukan"
  );

 }



 await prisma.user.delete({

  where:{
    id,
  },

 });



 return {

  message:
  "User berhasil dihapus",

 };


};
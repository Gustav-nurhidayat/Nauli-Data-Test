import { Request, Response } from "express";
import * as contactService from "../services/contact.service";

export const getAll = async (req: Request, res: Response) => {
  try {
    const contacts = await contactService.getAllContact();

    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const contact = await contactService.getContactById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, Email dan Message wajib diisi.",
      });
    }

    const contact = await contactService.createContact({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const contact = await contactService.updateContact(id, req.body);

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await contactService.deleteContact(id);

    return res.status(200).json({
      success: true,
      message: "Contact berhasil dihapus",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


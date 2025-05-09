import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";
import httpStatus from "http-status";

const getSingleAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdminFromDB(id);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin fetched successfully",
      data: result,
    });
  }
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdminFromDB(req.query);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admins fetched successfully",
      data: result,
    });
  }
});

const updateAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { admin } = req.body;
  const result = await AdminService.updateAdminIntoDB(id, admin);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  }
});
const deleteAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminService.deleteAdminFromDB(id);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  }
});
export const AdminController = {
  getSingleAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};

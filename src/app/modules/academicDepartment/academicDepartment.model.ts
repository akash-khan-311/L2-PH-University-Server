import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
// import AppError from "../../errors/AppError";
// import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: { type: String, required: true, unique: true },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
  },
});

// academicDepartmentSchema.pre("save", async function (next) {
//   const isDepartmentExists = await AcademicDepartment.findOne({
//     name: this.name,
//   });

//   if (isDepartmentExists) {
//     throw new AppError(httpStatus.CONFLICT, "Department already exists!😒");
//   }
//   next();
// });

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);

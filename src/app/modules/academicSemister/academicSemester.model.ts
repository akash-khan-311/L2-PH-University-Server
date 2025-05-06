import { model, Schema } from "mongoose";
import {
  TAcademicSemester,
  TAcademicSemesterCodes,
  TAcademicSemesterName,
  TMonths,
} from "./academicSemester.interface";

export const Months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const academicSemesterName: TAcademicSemesterName[] = [
  "Autumn",
  "Summer",
  "Fall",
];

const academicSemesterCode: TAcademicSemesterCodes[] = ["01", "02", "03"];

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: academicSemesterName,
  },
  code: {
    type: String,
    required: true,
    enum: academicSemesterCode,
  },
  year: {
    type: Date,
    required: true,
  },

  startMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Months,
  },
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);

import {
  TAcademicSemesterCodeMapper,
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

export const academicSemesterName: TAcademicSemesterName[] = [
  "Autumn",
  "Summer",
  "Fall",
];

export const academicSemesterCode: TAcademicSemesterCodes[] = [
  "01",
  "02",
  "03",
];

export const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};

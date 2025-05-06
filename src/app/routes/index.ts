import express from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/student",
    route: StudentRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/semesters",
    route: AcademicSemesterRoutes,
  },
];

// router.use("/student", StudentRoutes);
// router.use("/user", UserRoutes);

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

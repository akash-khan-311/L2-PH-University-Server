import config from "../config";

import { USER_ROLE } from "../modules/user/user.constant";
import User from "../modules/user/user.model";

const superAdmin = {
  id: "0001",
  email: "mdakashkhanbdinto@gmail.com",
  password: config.super_admin_password as string,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });
  if (!isSuperAdminExists) {
    await User.create(superAdmin);
  }
};

export default seedSuperAdmin;

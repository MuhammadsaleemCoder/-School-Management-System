import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

const seederAdmin = async () => {
  try {
    const adminExits = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!adminExits) {
      const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        name: "admin",
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        role: "admin",
      });
      console.log("Admin successfully created");
    } else {
      console.log("Admin already exist");
    }
  } catch (error) {
    console.log("server side error", error);
  }
};

export default seederAdmin;

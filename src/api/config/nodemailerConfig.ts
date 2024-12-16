import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "suportesistmadeponto@gmail.com",
        pass: "iqjf zlgz ypyi owsp",
    },
});

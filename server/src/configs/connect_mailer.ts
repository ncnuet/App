import * as nodemailer from "nodemailer";
import config from "./config_env";

const mailer = nodemailer.createTransport({
    service: config.MAIL_SERVICE,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASSWORD,
    }
});

export default mailer;
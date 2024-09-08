import { GraphQLError } from "graphql";

import { Resolver, schemaComposer } from "graphql-compose";
import config from "config";
import { UserModel } from "../../models";
import { jwtSign } from "../../../config/util";
import { comparePassword } from "../../libs/hash-password";
import transporter from "../../libs/mail-connect";
interface Args {
  email: string;
}
const resetPasswordResolver = new Resolver<any, any, Args, any>(
  {
    name: "resetPassword",
    type: "String",
    args: {
      email: "String!",
    },
    resolve: async ({ args }) => {
      const { email } = args;

      // console.log("email", email);
      const userEmail = await UserModel.findOne({ email });
      // console.log("email", userEmail);
      if (!userEmail) {
        throw new GraphQLError("Email not found");
      } else {
        // console.log("ddddddddddddddd");
        const token = await jwtSign(
          {
            _id: userEmail._id,
          },
          "1d"
        );
        // const link = `http://localhost:3000/reset/${token}/${userEmail?._id}`
        // const frontend = config.get("frontend.frontend_app_domain");
        const frontend = "http://localhost:3000";
        const link = `${frontend}/change/${token}/${userEmail?._id}`;
        const word = `
        <!doctype html>
        <html lang="en-US">
        <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset password</title>
        <meta name="description" content="Reset Password Email Template." />
        <style type="text/css">
        a:hover {
        text-decoration: underline !important;
        }
        </style>
        </head>

        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8" leftmargin="0">
        <!--100% body table-->
        <table
          cellspacing="0"
          border="0"
          cellpadding="0"
          width="100%"
          bgcolor="#f2f3f8"
          style="
          @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
          font-family: 'Open Sans', sans-serif;
          "
        >
        <tr>
        <td>
        <table
            style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            
            <tr>
            <td style="height: 50px">&nbsp;</td>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    max-width: 670px;
                    background: #fff;
                    border-radius: 3px;
                    text-align: center;
                    -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                  "
                >
                  <tr>
                    <td style="padding:10px 15px;text-align:center;background-color: #ffd012;"
              border-bottom: "0px solid #ffd012" >                  
                <h1>NIMITR</h1>

              </td>
                  </tr>
                  <td style="text-align: center">
                    <a href=""target="_blank">
                      <img
                        width="400"
                        src="https://cdn.pixabay.com/animation/2024/04/22/04/35/04-35-34-864_512.gif"
                        alt="ogo"
                        style="border-radius: 20px"
                      />
                    </a>
                  </td>
                  <tr>
                    <td style="padding: 0 35px">
                      <h1
                        style="
                          color: #393d47;
                          font-weight: 900;
                          margin: 20PX;
                          font-size: 32px;
                          font-family: 'Rubik', sans-serif;
                          padding-bottom: 26px;
                        "
                      >
                       Forgot your password?
                      </h1>
                      <p style="color: #393d47; font-size: 20px; line-height: 24px; margin: 0">
                        ถ้าคุณเป็นผู้ส่งคำขอรีเซ็ตรหัสผ่านสำหรับบัญชี โปรดคลิกปุ่มด้านล่าง ถ้าคุณไม่ได้ส่งคำขอ
                        คุณไม่ต้องดำเนินการใดๆ กับอีเมลนี้
                      </p>
                      <a
                        href="${link}"
                        style="
                          background: #ffd012;
                          text-decoration: none !important;
                          font-weight: 700;
                          margin-top: 35px;
                          margin-bottom: 35px;
                          color: #393d47;
                          text-transform: uppercase;
                          font-size: 18px;
                          padding: 20px 24px;
                          display: inline-block;
                          border-radius: 20px;
                          padding-left: 50px;
                          padding-right: 50px;
                        "
                        >Reset Password</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 35px">
                      <p style="color: #455056; font-size: 16px; line-height: 24px; margin: 0">
                        หากไม่สามารถกดปุ่มด้านบนได้คุณสามารถคัดลอกลิ้งค์นี้เพื่อรีเซ็ตรหัสผ่านได้ :
                      </p>
                      <p style="color: #455056; font-size: 15px; line-height: 24px; margin: 0">${link}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td
                      align="left"
                      bgcolor="#ffd012"
                      style="
                        padding: 24px;
                        font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        line-height: 24px;
                        border-bottom: 3px solid #ffd012;
                      "
                    >
                      <p style="margin: 0"><b>Contact us</b> <br /></p>
                      <p style="line-height: 2px">
                        Facebook :
                        <a style="color: #000000; text-decoration:none;"   href="https://www.facebook.com/streamsouthtech" target="_blank"
                          >Stream South Technology</a
                        ><br />
                      </p>
                      <p style="line-height: 8px">Email : <a>info@streamsouth.tech </a><br /></p>
                      <p style="line-height: 8px">
                        เวลาทำการ : จันทร์-ศุกร์ 09.00-18.00 น.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>

            <tr>
              <td style="text-align: center">
                <p
                  style="font-size: 14px; color: rgba(69, 80, 86, 0.7411764705882353); line-height: 18px; margin: 0 0 0"
                >
                  &copy; <strong> StreamSouth Co ,Ltd. rights reserved</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!--/100% body table-->
  </body>
</html>
        
                        `;
          const options = {
          from: `"NIMITR.ART" <${config.get("mail.user")}>`,
          to: email,
          subject: "ลืมรหัสผ่าน?",
          html: word,
        };
        await transporter.sendMail(options);
        return "success";
      }
    },
  },
  schemaComposer
);

const resetPasswordMutation = {
  resetPassword: resetPasswordResolver,
};

export default resetPasswordMutation;

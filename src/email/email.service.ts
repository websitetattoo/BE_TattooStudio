//Libary
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
//Entities
import { Booking } from 'src/entities/Booking.entity';

@Injectable()
export class EmailService {
  async sendEmailBooking(
    data: Booking,
    email: string = process.env.MAIL_ACCOUNT,
  ) {
    try {
      const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID;
      const GOOGLE_MAILER_CLIENT_SECRET =
        process.env.GOOGLE_MAILER_CLIENT_SECRET;
      const GOOGLE_MAILER_REFRESH_TOKEN =
        process.env.GOOGLE_MAILER_REFRESH_TOKEN;
      const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;

      // Khởi tạo OAuth2Client với Client ID và Client Secret
      const myOAuth2Client = new OAuth2Client(
        GOOGLE_MAILER_CLIENT_ID,
        GOOGLE_MAILER_CLIENT_SECRET,
      );
      // Set Refresh Token vào OAuth2Client Credentials
      myOAuth2Client.setCredentials({
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
      });

      const myAccessTokenObject = await myOAuth2Client.getAccessToken();
      const myAccessToken = myAccessTokenObject?.token;

      // Cấu hình, dùng để gọi hành động gửi mail
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: ADMIN_EMAIL_ADDRESS,
          clientId: GOOGLE_MAILER_CLIENT_ID,
          clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
          refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
          accessToken: myAccessToken,
        },
      });

      const inforBooking = `
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;"><b>${data?.name}</b></td>
          <td style="border: 1px solid #dddddd; padding: 8px;"><b>${data?.phone}</b></td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${data?.email}</td>
        </tr>
      `;
      const table = `
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Name</th>
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Phone</th>
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Email</th>
            </tr>
          </thead>
          <tbody>
            ${inforBooking}
          </tbody>
        </table>
      `;

      // Thông tin gửi từ phía client lên thông qua API
      const mailOptions = {
        to: email, // Gửi đến ai?
        subject: 'Booking Artist', // Tiêu đề email
        html: `<div style="margin-bottom: 20px; text-align:center">${table}</div>`, // Nội dung email
      };

      // Gọi hành động gửi email
      await transport.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      throw new Error('Error sending email');
    }
  }
}

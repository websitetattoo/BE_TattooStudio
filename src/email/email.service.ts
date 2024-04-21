//Libary
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class EmailService {
  async sendEmailBooking(data: any, email: string = process.env.MAIL_ACCOUNT) {
    try {
      console.log('email:', email);
      console.log('data:', data);

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

      //Chuyển đổi time
      const newSchedule = new Date(data?.schedule);
      const formattedDate = newSchedule.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const inforBooking = `
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">${data?.name}</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${data?.phone}</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${data?.address}</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${data?.email}</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${data?.artist}</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formattedDate}</td>
        </tr>
      `;
      const table = `
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Name</th>
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Phone</th>
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Address</th>
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Email</th>
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Artist</th>
              <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">schedule</th>
            </tr>
          </thead>
          <tbody>
            ${inforBooking}
          </tbody>
        </table>
      `;

      let listItem = '';
      if (data.images && Array.isArray(data.images)) {
        listItem = data.images
          .map(
            (img, index) => `
              <tr>
                <td style="border: 1px solid #dddddd; padding: 8px; font-weight: bold;">${index + 1}</td>
                <td style="border: 1px solid #dddddd; padding: 8px;"><img src="${img}" alt="Img not found" style="max-width:300px; max-height:300px;"/></td>
              </tr>
            `,
          )
          .join('');
      }

      const tableImg = `
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">STT</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Image</th>
          </tr>
        </thead>
        <tbody>
          ${listItem}
        </tbody>
      </table>
      `;

      // Thông tin gửi từ phía client lên thông qua API
      const mailOptions = {
        to: email, // Gửi đến ai?
        subject: 'Booking Artist', // Tiêu đề email
        html: `<div style="margin-bottom: 20px; text-align:center"><div>${table}</div>
        <div style="margin-top: 20px;">${tableImg}</div></div>`, // Nội dung email
      };

      // Gọi hành động gửi email
      await transport.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      throw new Error('Error sending email');
    }
  }
}

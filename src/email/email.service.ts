//Libary
import { Injectable } from '@nestjs/common';
import { SettingSendEmail } from './email.util';

@Injectable()
export class EmailService {
  async sendEmailBooking(data: any, email: string = process.env.MAIL_ACCOUNT) {
    try {
      //Thiết lập cấu hình SendEmail
      const transport = await SettingSendEmail();

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

  // Gửi email tới người dùng quên mật khẩu
  async sendMailUserResetPassword(
    email: string,
    resetToken: string,
  ): Promise<void> {
    try {
      //Thiết lập cấu hình SendEmail
      const transport = await SettingSendEmail();

      // Nội dung email gửi tới người dùng
      const resetPasswordLink = `${process.env.PATH_URL_FE}/reset-password/${encodeURIComponent(resetToken)}`;
      const mailOptions = {
        to: email,
        subject: 'Reset Your Password', // Tựa đề email
        html: `<p>Hello,</p>
          <p>We received a request to reset your password. Please click the following link to reset your password:</p>
          <p><a href="${resetPasswordLink}">Reset Password</a></p>
          <p>If you didn't request a password reset, you can ignore this email.</p>
          <p>Thank you!</p>`, // Nội dung email
      };

      // Gửi email
      await transport.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
}

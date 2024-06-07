"use strict";

/**
 * A set of functions called "actions" for `auth`
 */
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

module.exports = {
  initiateVerification: async (ctx) => {
    const { identifier } = ctx.request.body;

    // Generate a verification code and associate it with the user's email address
    const verificationCode = generateVerificationCode();
    // ctx.cookies.set("verificationCode", verificationCode);

    // Save the verification code in your database or any other storage mechanism

    // Send an email containing the verification code to the user's email address
    await sendVerificationEmail(identifier, verificationCode);

    return {
      message: "Verification code sent to email",
      verifiedCode: verificationCode,
    };
  },

  validateVerificationCode: async (ctx) => {
    const { identifier, verificationCode } = ctx.request.body;

    // Retrieve the verification code associated with the user's email address from your storage mechanism
    // const storedVerificationCode = retrieveVerificationCode(identifier);
    const storedVerificationCode = ctx.cookies.get("verificationCode");

    if (verificationCode === storedVerificationCode) {
      return { message: "Verification successful", verify: true };
    } else {
      return { message: "Invalid verification code", verify: false };
    }
  },

  sendEmailToUser: async (ctx) => {
    const { identifier, username } = ctx.request.body;
    console.log(identifier, username, "identifier, username");

    const transporter = nodemailer.createTransport({
      // Configure your email service provider settings here
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: "Admin",
        to: identifier,
        subject: `Hi ${username}, Welcome to our Reef business`,
        text: `Your account was approved by admin. You can log in with your credential info now`,
      });

      return { message: "Sent the message" };
    } catch (error) {
      console.log("error", error);

      return { message: "Failed the message" };
    }
  },
  sendNewUser: async (ctx) => {
    const { identifier, password } = ctx.request.body;
    console.log(identifier, password, "identifier, username");

    const transporter = nodemailer.createTransport({
      // Configure your email service provider settings here
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: "Admin",
        to: identifier,
        subject: `Hi, Welcome to our Reef business`,
        text: `You was added to Reef Business. 
          https://reef-admin.vercel.app/signin 
          Cridential info:
          Email: ${identifier}, 
          Password: ${password}
        `,
      });

      return { message: "Sent the message" };
    } catch (error) {
      console.log("error", error);

      return { message: "Failed the message" };
    }
  },
  resetPassword: async (ctx) => {
    const { identifier } = ctx.request.body;

    const secretKey = 'fvKZiYjzgHZkIfFGmbvUzw==';

    const payload = {
      email: identifier
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    return { resetPasswordToken: token };
  }
};

function generateVerificationCode() {
  // Generate a random verification code
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendVerificationEmail(email, verificationCode) {
  // localStorage.setItem("verficationCode", verificationCode);

  // Create a Nodemailer transporter using your email service provider's settings
  const transporter = nodemailer.createTransport({
    // Configure your email service provider settings here
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: "Strapi Bankend",
      to: email,
      subject: "Verification Code for Two-Step Verification",
      text: `Your verification code is: ${verificationCode}`,
    });
  } catch (error) {
    console.log("error", error);
  }
}

async function retrieveVerificationCode(email) {
  // Perform a database query to retrieve the user's verification code based on the provided email

  return "1234";
  // const user = await strapi.query('user', 'users-permissions').findOne({ email });

  // if (user && user.verificationCode) {
  //   return user.verificationCode;
  // } else {
  //   return null; // Handle the case where the verification code is not found
  // }
}

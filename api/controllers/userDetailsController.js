const crypto = require("crypto");
const axios = require("axios");
require("dotenv").config();
const UserDetails = require("../models/userDetailModel");
const User = require("../models/userModel");

async function initiateSessionController(req, res) {
  try {
    const userSession = req.session;
    if (!userSession.isLoggedIn) {
      return res.status(401).json({ response: "User Forbidden" });
    }
    const reference_id = crypto.randomBytes(8).toString("hex");
    const options = {
      method: "POST",
      url: "https://in.staging.decentro.tech/v2/kyc/digilocker/initiate_session",
      headers: {
        accept: "application/json",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        module_secret: process.env.MODULE_SECRET,
        "content-type": "application/json",
      },
      data: {
        consent: true,
        redirect_to_signup: false,
        reference_id,
        consent_purpose: "To Create an initial session for User",
      },
    };
    const response = await axios.request(options);
    res.status(200).json({
      response: response.data.message,
      transactionId: response.data.decentroTxnId,
      redirectUrl: response.data.data.authorizationUrl,
    });
    // return {
    //   response: response.data.message,
    //   transactionId: response.data.decentroTxnId,
    //   redirectUrl: response.data.data.authorizationUrl,
    // };
  } catch (err) {
    console.log(err);
    return res.status(400).json({ response: "Internal Error" });
  }
}

async function getAadhaarController(req, res) {
  try {
    const { transactionId, digilockerCode } = req.body;
    const userSession = req.session;
    if (!userSession.isLoggedIn) {
      return res.status(401).json({ response: "User Forbidden" });
    }
    const reference_id = crypto.randomBytes(8).toString("hex");
    const options = {
      method: "POST",
      url: "https://in.staging.decentro.tech/v2/kyc/digilocker/eaadhaar/onetime",
      headers: {
        accept: "application/json",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        module_secret: process.env.MODULE_SECRET,
        "content-type": "application/json",
      },
      data: {
        consent: true,
        consent_purpose: "Fetch Aadhar Details and Save",
        reference_id,
        digilocker_code: digilockerCode,
        initial_decentro_transaction_id: transactionId,
        generate_xml: false,
        generate_pdf: true,
      },
    };
    const response = await axios.request(options);
    const userExists = await User.findOne({ email: userSession.email });
    if (!userExists) {
      return res.status(400).json({ response: "User Does Not Exists" });
    }
    const newUserDetails = new UserDetails({
      userId: userExists._id,
      aadhaarDetails: response.data,
    });
    await newUserDetails.save();
    res.status(200).json({ response: "User Aadhaar Updated Successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ response: "Internal Error" });
  }
}

module.exports = {
  initiateSessionController,
  getAadhaarController,
};

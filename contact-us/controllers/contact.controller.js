import { Message } from "../model/message.model.js";

// controller for sending the message
const contactUs = async(req, res) => {
  
  // take all parameters from request
  const { name, email, phone, subject, message } = req.body;
  // Check whether no filed should be empty
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  // creates a new message entry
  const newMsg = await Message.create({
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    message: message,
  });

  // checks whether message was successfully sent or not
  if (!newMsg) {
    res.status(500).json({
      message: "trouble sending the message.",
    });
  }

  // save the db
  await newMsg.save({ validateBeforeSave: false });

  // set the successful response code as well as message
  res.status(200).json({
    message: "Your response has been recorded.",
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    message: message,
  });
};

// controller for home
const getContactUs = (_, res) => {
  res.status(200).json({
    message: "Contact-us",
  });
};

export { contactUs, getContactUs };

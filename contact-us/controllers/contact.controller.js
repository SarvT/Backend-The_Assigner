
// controller for sending the message
const contactUs = (req, res) => {
  // take all parameters from request
  const { name, email, phone, subject, message } = req.body;
  // Check whether no filed should be empty
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

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

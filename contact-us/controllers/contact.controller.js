const contactUs = (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }
  res.status(200).json({
    message: "Your response has been recorded.",
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    message: message,
  });
};

const getContactUs = (_, res) => {
  res.status(200).json({
    message: "Contact-us",
  });
};

export { contactUs, getContactUs };

import { ErrorFormat as Error } from "../Error.js";
import { Response } from "../Response.js";
import { Form } from "../model/form.model.js";

const getForms = async (_, res) => {
  try {
    const forms = await Form.find();
    if (!forms)
      return res
        .status(200)
        .json(new Response(500, forms, "There is no form at the server."));

    return res
      .status(200)
      .json(new Response(200, forms, "forms fetched successfully"));
  } catch (error) {
    new Error(500, error.message || "error while fetching the froms");
  }
};

const sendForm = async (req, res) => {
  try {
    const { name, email, phone, location, services } = req.body;
    if (!name || !email | !phone || !location || !services)
      new Error(500, "All fields are required");

    const currUser = req.user;
    if (!currUser.email == email) {
      new Error(500, "Please check your email or try login again.");
    }

    const newForm = await Form.create({
      name,
      email,
      phone,
      location,
      services,
    });

    if (!newForm) new Error(500, "Trouble sending your form");

    return res
      .status(200)
      .json(new Response(200, newForm, "form submitted successfully"));
  } catch (error) {
    new Error(500, error.message || "Trouble sending your form");
  }
};

export { getForms, sendForm };

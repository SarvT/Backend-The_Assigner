import { Candidate } from "../model/candidate.model.js";

const submitForm = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      qualification,
      experience,
      contact,
      message,
    } = req.body;
    const resume = req.file.filename;

    const candidate = await new Candidate({
      firstName: firstName,
      lastName: lastName,
      email: email,
      qualification: qualification,
      experience: experience,
      contact: contact,
      message: message || "NA",
      resume: resume || "NA",
    });

    if (!candidate) {
      return res.status(500).json({
        success: false,
        message: "Error creating submitting the info.",
        data: null,
      });
    }
    await candidate.save()
    return res.status(200).json({
      success: true,
      message: "Candidate's information has been successfully submitted.",
      data: candidate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getCandidateByEmail = async (req, res) => {
  const { email } = req.body;
  const candidate = await Candidate.find({ email:email });
  if (!candidate) {
    return res.status(500).json({
      success: false,
      message: "Error getting candidate's info.",
      data: null,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Candidate's information has been successfully fetched.",
    data: candidate,
  });
};

export { submitForm, getCandidateByEmail };

// function to handle successfull request
const successRedirect = async (req, res) => {
  try {
    if (!req.user) {
      res.redirect("/auth/cb/failure");
    }
    res.status(200).json({
      success: true,
      message: "You are successfully authenticated! " + req.user._json.name,
      data: req.user._json,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Some error occured while authenticating! " + error.message,
    });
  }
};

// function to handle failure request
const failureRedirect = async (req, res) => {
  res.status(200).json({
    success: false,
    message: "Some error occured while authenticating!",
  });
};

export { successRedirect, failureRedirect };
 
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Log out successfull" });
  } catch (error) {
    console.log(`Error in the logOut controller ${error.message}`);
    res.status(500).json({ error: "Server error" });
  }
};

export default logout;

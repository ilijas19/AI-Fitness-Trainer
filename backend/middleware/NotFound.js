const NotFound = (req, res) => {
  res.status(404).json({ msg: "Resource Not Found" });
};
export default NotFound;

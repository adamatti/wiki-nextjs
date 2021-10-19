import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  req.session.set("user", {isLoggedIn: false});
  // req.session.destroy();
  res.json({ isLoggedIn: false });
});
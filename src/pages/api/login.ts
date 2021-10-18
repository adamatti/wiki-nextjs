import withSession from "../../lib/session";
import {login} from "../../lib/firebaseAuth";

export default withSession(async (req, res) => {
  console.log("Body", req.body);
  const { username, password } = await req.body;

  try {
    const {ok, errorMessage } = await login(username, password);
    if (!ok) {
      res.status(401).json({ 
        errorMessage,
        isLoggedIn: false
      });
      return
    } 
    const user = { isLoggedIn: true, username};
    req.session.set("user", user);
    await req.session.save();
    res.status(200).json(user);
      
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
});
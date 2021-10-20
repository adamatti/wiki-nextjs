import withSession from "../../lib/session";
import {login} from "../../lib/firebaseAuth";
import {default as loggerParent} from "../../logger";
const logger = loggerParent.child({file: 'loginApi'});

export default withSession(async (req, res) => {
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
    logger.error("Error: ", error);
    res.status(500).json(error);
  }
});
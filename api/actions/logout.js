export default function logout(req, res) {
  return new Promise((resolve) => {
    /*req.session.destroy(() => {
      req.session = null;
      return resolve(null);
    });*/
  	res.clearCookie('AuthSession');
  	return resolve(null);
  });
}

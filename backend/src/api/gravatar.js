const md5 = require('md5');

const getLink = async (email) =>
{
  let prehash = email.trim().toLowerCase();
  let hash = md5(prehash);
  return "https://www.gravatar.com/avatar/" + hash + '?s=200';
}

module.exports = {
  getLink
};

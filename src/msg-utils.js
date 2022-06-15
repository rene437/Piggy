async function getMentionedUser(msg) {
  let user = msg.mentions.users.first();
  if (!user) {
    let userId = /\d{18}/.exec(msg.content)?.[0];
    if (userId) user = await msg.client.users.fetch(userId);
  }
  return user;
}

module.exports = {
  getMentionedUser,
}

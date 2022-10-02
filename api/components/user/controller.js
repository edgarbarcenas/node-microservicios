const { faker } = require("@faker-js/faker");
const auth = require("../auth");
const TABLA = "user";

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/mysql");
  }
  const list = async () => {
    return store.list(TABLA);
  };

  const get = async (id) => {
    return store.get(TABLA, id);
  };

  const upsert = async (body) => {
    const user = {
      name: body.name,
      username: body.username,
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = faker.datatype.uuid();
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: body.username,
        password: body.password,
      });
      return store.upsert(TABLA, user);
    }
  };

  const follow = async (from, to) => {
    return store.upsert(TABLA + "_follow", {
      user_from: from,
      user_to: to,
    });
  };

  const following = async (user) => {
    const join = {};
    join[TABLA] = "user_to";
    const query = { user_from: user };
    return store.query(TABLA + "_follow", query, join);
  };

  return {
    list,
    get,
    upsert,
    follow,
    following,
  };
};

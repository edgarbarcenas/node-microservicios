const bcryit = require("bcrypt");

const auth = require("../../../auth");
const TABLA = "auth";

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/mysql");
  }

  const login = async (username, password) => {
    const data = await store.query(TABLA, { username: username });
    return bcryit.compare(password, data.password).then((isEqual) => {
      if (isEqual === true) {
        //generar token
        return auth.sign(data);
      } else {
        throw new Error("Contraseña incorrecta");
      }
    });
  };

  const upsert = async (body) => {
    const authData = {
      id: body.id,
    };

    if (body.username) {
      authData.username = body.username;
    }

    if (body.password) {
      authData.password = await bcryit.hash(body.password, 5);
    }

    return store.upsert(TABLA, authData);
  };

  return {
    upsert,
    login,
  };
};

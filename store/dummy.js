const db = {
  user: [{ id: "1", name: "Carlos" }],
};

const list = (table) => {
  return db[table];
};

const get = (table, id) => {
  let col = list(table);
  return col.filter((item) => item.id === id)[0] || null;
};

const upsert = (table, data) => {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
  console.log(db);
  return data;
};

const deleteOne = (table, id) => {
  return true;
};

const query = async (tabla, query, db) => {
  let col = await list(tabla, db);
  let keys = Object.keys(query);
  let key = keys[0];
  return col.filter((item) => item[key] === query[key])[0] || null;
};

module.exports = { list, upsert, deleteOne, get, query };

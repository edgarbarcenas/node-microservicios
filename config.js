module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret!",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS || "",
    database: process.env.MYSQL_DB || "node-microservicios",
  },
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || 3001,
    host: process.env.MYSQL_SRV_HOST || "localhost",
  },
  post: {
    port: process.env.POST_PORT || 3002,
    host: process.env.POST_HOST || "localhost",
  },
};

const success = (req, res, message, status) => {
  res.status(status || 200).send({
    error: false,
    status,
    body: message || "",
  });
};

const error = (req, res, message, status) => {
  res.status(status || 500).send({
    error: true,
    status,
    body: message || "Internal Server Error",
  });
};

module.exports = { success, error };

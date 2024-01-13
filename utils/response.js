export const response = (res, status, data) => {
  return res.status(status).json(data);
};

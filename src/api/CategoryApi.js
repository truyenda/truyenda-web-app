import Caller from "../utils/APICaller";

export const getAllCategory = () => {
  var uri = "categories";
  return Caller(uri, "GET");
};

export const addCategory = category => {
  var uri = "categories";
  var data = { TenLoaiTruyen: category.name, MoTa: category.description };
  return Caller(uri, "POST", data);
};

export const updateCategory = category => {
  var uri = "categories/" + category.Id;
  var data = { TenLoaiTruyen: category.name, MoTa: category.description };
  return Caller(uri, "PUT", data);
};

export const deleteCategory = category => {
  var uri = "categories/" + category.Id;
  return Caller(uri, "DELETE");
};

import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
 return axios.delete(`${baseUrl}/${id}`);
};

const changeNumber = (id, updatedContact) => {
  return axios.put(`${baseUrl}/${id}`, updatedContact).then((response) => response.data);
}

const phonebookServices = { getAll, create, deleteContact, changeNumber };

export default phonebookServices;

import axios from "axios";

const API_URL = "https://peliculas-db-flgg.onrender.com/api/productoras";

export const getProductoras = () => axios.get(API_URL);
export const createProductora = (data) => axios.post(API_URL, data);
export const updateProductora = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteProductora = (id) => axios.delete(`${API_URL}/${id}`);
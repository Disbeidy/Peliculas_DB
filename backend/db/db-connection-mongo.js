const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require('mongoose');

const getConnection = async () => {
  try {
    const url = process.env.MONGO_URI;
    await mongoose.connect(url);
    console.log('✅conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('❌Error al conectar a MongoDB Atlas:', error);
  }
};
module.exports = { 
    getConnection };
    
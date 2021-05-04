const mongoose  = require("mongoose");

const dbConeccion = async () => {
    try {
       await mongoose.connect(process.env.BD_CNN, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true
       })
       console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar base de datos');
    }
}


module.exports = {
    dbConeccion
}
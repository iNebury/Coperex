import { Schema, model } from "mongoose";

const compañiaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la compañía es requerido"],
        maxLength: [50, "El nombre de la compañía no puede exceder los 50 caracteres"]
    },
    añosDeTrayectoria: {
        type: Number,
    },
    impacto: {
        type: String,
        required: [true, "El impacto es requerido"],
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es requerido"],
        unique: true
    },
    telefono: {
        type: String,
        minLength: 8,
        maxLength: 15,
        required: true
    },
    direccion: {
        type: String,
        required: [true, "La dirección es requerida"]
    },
    categoria: {
        type: String,
        required: [true, "La categoría es requerida"],
        enum: ["Tecnología", "Ropa", "Alimentos", "Medicina"]
    },
    fundacion:{
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

compañiaSchema.methods.toJSON = function() {
    const { __v, _id, ...compania } = this.toObject();
    compania.uid = _id;
    return compania;
};

export default model("Compañia", compañiaSchema);

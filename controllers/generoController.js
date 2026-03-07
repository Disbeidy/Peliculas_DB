const Genero = require('../models/Genero');

const {request, response} = require('express');

const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error) {
        console.error('❌Error al obtener géneros:', error);
        res.status(500).json({ msg: 'Ocurrio un error al listar los géneros' });
    }
}
const createGenero = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body;

        const generoDB = await Genero.findOne({ nombre });
        if (generoDB) {
            return res.status(400).json({ msg: `El género ${nombre} ya existe` });
        }

        const genero = new Genero({ nombre, descripcion });

        await genero.save();
        res.status(201).json(genero);

    } catch (error) {
        console.error('❌Error al crear género:', error);
        res.status(500).json({ msg: 'Ocurrio un error al guardar el género' });
    }
}

const updateGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, estado } = req.body;

        const genero = await Genero.findByIdAndUpdate(
            id,
            {
                nombre,
                descripcion,
                estado,
                fechaActualizacion: Date.now()
            },
            { new: true }
        );

        res.status(200).json(genero);

    } catch (error) {
        console.error('❌Error al actualizar género:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el género' });
    }
};
module.exports = {
    getGeneros,
    createGenero,
    updateGenero
}
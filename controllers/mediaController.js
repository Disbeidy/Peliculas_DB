const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');
const { request, response } = require('express');

// GET: listar media
const getMedia = async (req = request, res = response) => {
    try {
        const media = await Media.find()
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo');

        res.status(200).json(media);
    } catch (error) {
        console.error('❌ Error al obtener media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar media' });
    }
};

// POST: crear media
const createMedia = async (req = request, res = response) => {
    try {
        const { serial, titulo, sinopsis, urlPelicula, imagenPortada, anioEstreno, genero, director, productora, tipo } = req.body;

        // Validar duplicados
        const serialDB = await Media.findOne({ serial });
        if (serialDB) return res.status(400).json({ msg: `El serial ${serial} ya existe` });

        const urlDB = await Media.findOne({ urlPelicula });
        if (urlDB) return res.status(400).json({ msg: `La URL ${urlPelicula} ya existe` });

        // Validar que los relacionados estén activos
        const generoDB = await Genero.findOne({ _id: genero, estado: 'Activo' });
        if (!generoDB) return res.status(400).json({ msg: 'El género no es válido o no está activo' });

        const directorDB = await Director.findOne({ _id: director, estado: 'Activo' });
        if (!directorDB) return res.status(400).json({ msg: 'El director no es válido o no está activo' });

        const productoraDB = await Productora.findOne({ _id: productora, estado: 'Activo' });
        if (!productoraDB) return res.status(400).json({ msg: 'La productora no es válida o no está activa' });

        const tipoDB = await Tipo.findById(tipo);
        if (!tipoDB) return res.status(400).json({ msg: 'El tipo no es válido' });

        const media = new Media(req.body);
        await media.save();

        res.status(201).json(media);

    } catch (error) {
        console.error('❌ Error al crear media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al guardar media' });
    }
};

// PUT: actualizar media
const updateMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const media = await Media.findByIdAndUpdate(
            id,
            { ...req.body, fechaActualizacion: Date.now() },
            { new: true }
        );

        res.status(200).json(media);

    } catch (error) {
        console.error('❌ Error al actualizar media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar media' });
    }
};

// DELETE: eliminar media
const deleteMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        await Media.findByIdAndDelete(id);

        res.status(200).json({ msg: 'Media eliminada correctamente' });

    } catch (error) {
        console.error('❌ Error al eliminar media:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar media' });
    }
};

module.exports = {
    getMedia,
    createMedia,
    updateMedia,
    deleteMedia
};
import { useEffect, useState } from "react";
import { getMedia, createMedia, updateMedia, deleteMedia } from "../../services/mediaService";
import { getGeneros } from "../../services/generoService";
import { getDirectores } from "../../services/directorService";
import { getProductoras } from "../../services/productoraService";
import { getTipos } from "../../services/tipoService";
import Swal from "sweetalert2";

function MediaPage() {
  const [media, setMedia] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [form, setForm] = useState({
    serial: "",
    titulo: "",
    sinopsis: "",
    urlPelicula: "",
    urlImagen: "",
    anioEstreno: "",
    genero: "",
    director: "",
    productora: "",
    tipo: ""
  });

  const [editId, setEditId] = useState(null);

  const cargarTodo = async () => {
    const [m, g, d, p, t] = await Promise.all([
      getMedia(),
      getGeneros(),
      getDirectores(),
      getProductoras(),
      getTipos()
    ]);

    setMedia(m.data);
    setGeneros(g.data.filter(x => x.estado === "Activo"));
    setDirectores(d.data.filter(x => x.estado === "Activo"));
    setProductoras(p.data.filter(x => x.estado === "Activo"));
    setTipos(t.data);
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = () => {
    if (!form.serial.trim() || !form.titulo.trim()) {
      Swal.fire("Error", "Serial y título son obligatorios", "error");
      return;
    }

    if (editId) {
      updateMedia(editId, form).then(() => {
        Swal.fire("Actualizado", "Media actualizada correctamente", "success");
        setEditId(null);
        setForm({
          serial: "",
          titulo: "",
          sinopsis: "",
          urlPelicula: "",
          urlImagen: "",
          anioEstreno: "",
          genero: "",
          director: "",
          productora: "",
          tipo: ""
        });
        cargarTodo();
      });
    } else {
      createMedia(form).then(() => {
        Swal.fire("Creado", "Media creada correctamente", "success");
        setForm({
          serial: "",
          titulo: "",
          sinopsis: "",
          urlPelicula: "",
          urlImagen: "",
          anioEstreno: "",
          genero: "",
          director: "",
          productora: "",
          tipo: ""
        });
        cargarTodo();
      });
    }
  };

  const editar = (m) => {
    setEditId(m._id);
    setForm({
      serial: m.serial,
      titulo: m.titulo,
      sinopsis: m.sinopsis,
      urlPelicula: m.urlPelicula,
      urlImagen: m.urlImagen,
      anioEstreno: m.anioEstreno,
      genero: m.genero._id,
      director: m.director._id,
      productora: m.productora._id,
      tipo: m.tipo._id
    });
  };

  const eliminar = (id) => {
    Swal.fire({
      title: "¿Eliminar?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMedia(id).then(() => {
          Swal.fire("Eliminado", "Media eliminada correctamente", "success");
          cargarTodo();
        });
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2>Módulo de Media (Películas y Series)</h2>

      <div className="card p-3 mt-3">
        <h4>{editId ? "Editar Media" : "Crear Media"}</h4>

        <input type="text" name="serial" placeholder="Serial" className="form-control mt-2" value={form.serial} onChange={handleChange} />
        <input type="text" name="titulo" placeholder="Título" className="form-control mt-2" value={form.titulo} onChange={handleChange} />
        <textarea name="sinopsis" placeholder="Sinopsis" className="form-control mt-2" value={form.sinopsis} onChange={handleChange} />
        <input type="text" name="urlPelicula" placeholder="URL de la película" className="form-control mt-2" value={form.urlPelicula} onChange={handleChange} />
        <input type="text" name="urlImagen" placeholder="URL de la imagen" className="form-control mt-2" value={form.urlImagen} onChange={handleChange} />
        <input type="number" name="anioEstreno" placeholder="Año de estreno" className="form-control mt-2" value={form.anioEstreno} onChange={handleChange} />

        <select name="genero" className="form-control mt-2" value={form.genero} onChange={handleChange}>
          <option value="">Seleccione género</option>
          {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
        </select>

        <select name="director" className="form-control mt-2" value={form.director} onChange={handleChange}>
          <option value="">Seleccione director</option>
          {directores.map(d => <option key={d._id} value={d._id}>{d.nombre}</option>)}
        </select>

        <select name="productora" className="form-control mt-2" value={form.productora} onChange={handleChange}>
          <option value="">Seleccione productora</option>
          {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
        </select>

        <select name="tipo" className="form-control mt-2" value={form.tipo} onChange={handleChange}>
          <option value="">Seleccione tipo</option>
          {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
        </select>

        <button className="btn btn-primary mt-3" onClick={guardar}>
          {editId ? "Actualizar" : "Guardar"}
        </button>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Portada</th>
            <th>Título</th>
            <th>Serial</th>
            <th>Año</th>
            <th>Género</th>
            <th>Director</th>
            <th>Productora</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {media.map((m) => (
            <tr key={m._id}>
              <td><img src={m.urlImagen} alt={m.titulo} width="70" /></td>
              <td>{m.titulo}</td>
              <td>{m.serial}</td>
              <td>{m.anioEstreno}</td>
              <td>{m.genero?.nombre}</td>
              <td>{m.director?.nombre}</td>
              <td>{m.productora?.nombre}</td>
              <td>{m.tipo?.nombre}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editar(m)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminar(m._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MediaPage;
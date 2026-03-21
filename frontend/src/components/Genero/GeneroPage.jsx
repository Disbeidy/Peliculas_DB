import { useEffect, useState } from "react";
import { getGeneros, createGenero, updateGenero, deleteGenero } from "../../services/generoService";
import Swal from "sweetalert2";

function GeneroPage() {
  const [generos, setGeneros] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "", estado: "Activo" });
  const [editId, setEditId] = useState(null);

  const cargarGeneros = () => {
    getGeneros().then(res => setGeneros(res.data));
  };

  useEffect(() => {
    cargarGeneros();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarGenero = () => {
    if (!form.nombre.trim()) {
      Swal.fire("Error", "El nombre es obligatorio", "error");
      return;
    }

    if (editId) {
      updateGenero(editId, form).then(() => {
        Swal.fire("Actualizado", "Género actualizado correctamente", "success");
        setEditId(null);
        setForm({ nombre: "", descripcion: "", estado: "Activo" });
        cargarGeneros();
      });
    } else {
      createGenero(form).then(() => {
        Swal.fire("Creado", "Género creado correctamente", "success");
        setForm({ nombre: "", descripcion: "", estado: "Activo" });
        cargarGeneros();
      });
    }
  };

  const editar = (genero) => {
    setEditId(genero._id);
    setForm({
      nombre: genero.nombre,
      descripcion: genero.descripcion,
      estado: genero.estado
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
        deleteGenero(id).then(() => {
          Swal.fire("Eliminado", "Género eliminado correctamente", "success");
          cargarGeneros();
        });
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2>Módulo de Género</h2>

      <div className="card p-3 mt-3">
        <h4>{editId ? "Editar Género" : "Crear Género"}</h4>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="form-control mt-2"
          value={form.nombre}
          onChange={handleChange}
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          className="form-control mt-2"
          value={form.descripcion}
          onChange={handleChange}
        />

        <select
          name="estado"
          className="form-control mt-2"
          value={form.estado}
          onChange={handleChange}
        >
          <option>Activo</option>
          <option>Inactivo</option>
        </select>

        <button className="btn btn-primary mt-3" onClick={guardarGenero}>
          {editId ? "Actualizar" : "Guardar"}
        </button>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {generos.map((g) => (
            <tr key={g._id}>
              <td>{g.nombre}</td>
              <td>{g.estado}</td>
              <td>{g.descripcion}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editar(g)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminar(g._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GeneroPage;
import { useEffect, useState } from "react";
import { getTipos, createTipo, updateTipo, deleteTipo } from "../../services/tipoService";
import Swal from "sweetalert2";

function TipoPage() {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: ""
  });
  const [editId, setEditId] = useState(null);

  const cargarTipos = () => {
    getTipos().then(res => setTipos(res.data));
  };

  useEffect(() => {
    cargarTipos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarTipo = () => {
    if (!form.nombre.trim()) {
      Swal.fire("Error", "El nombre es obligatorio", "error");
      return;
    }

    if (editId) {
      updateTipo(editId, form).then(() => {
        Swal.fire("Actualizado", "Tipo actualizado correctamente", "success");
        setEditId(null);
        setForm({ nombre: "", descripcion: "" });
        cargarTipos();
      });
    } else {
      createTipo(form).then(() => {
        Swal.fire("Creado", "Tipo creado correctamente", "success");
        setForm({ nombre: "", descripcion: "" });
        cargarTipos();
      });
    }
  };

  const editar = (t) => {
    setEditId(t._id);
    setForm({
      nombre: t.nombre,
      descripcion: t.descripcion
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
        deleteTipo(id).then(() => {
          Swal.fire("Eliminado", "Tipo eliminado correctamente", "success");
          cargarTipos();
        });
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2>Módulo de Tipo</h2>

      <div className="card p-3 mt-3">
        <h4>{editId ? "Editar Tipo" : "Crear Tipo"}</h4>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre del tipo (Serie, Película...)"
          className="form-control mt-2"
          value={form.nombre}
          onChange={handleChange}
        />

        <textarea
          name="descripcion"
          placeholder="Descripción del tipo"
          className="form-control mt-2"
          value={form.descripcion}
          onChange={handleChange}
        />

        <button className="btn btn-primary mt-3" onClick={guardarTipo}>
          {editId ? "Actualizar" : "Guardar"}
        </button>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tipos.map((t) => (
            <tr key={t._id}>
              <td>{t.nombre}</td>
              <td>{t.descripcion}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editar(t)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminar(t._id)}>
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

export default TipoPage;
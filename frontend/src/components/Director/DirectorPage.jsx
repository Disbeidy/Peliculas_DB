import { useEffect, useState } from "react";
import { getDirectores, createDirector, updateDirector, deleteDirector } from "../../services/directorService";
import Swal from "sweetalert2";

function DirectorPage() {
  const [directores, setDirectores] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    estado: "Activo"
  });
  const [editId, setEditId] = useState(null);

  const cargarDirectores = () => {
    getDirectores().then(res => setDirectores(res.data));
  };

  useEffect(() => {
    cargarDirectores();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarDirector = () => {
    if (!form.nombre.trim()) {
      Swal.fire("Error", "El nombre es obligatorio", "error");
      return;
    }

    if (editId) {
      updateDirector(editId, form).then(() => {
        Swal.fire("Actualizado", "Director actualizado correctamente", "success");
        setEditId(null);
        setForm({ nombre: "", estado: "Activo" });
        cargarDirectores();
      });
    } else {
      createDirector(form).then(() => {
        Swal.fire("Creado", "Director creado correctamente", "success");
        setForm({ nombre: "", estado: "Activo" });
        cargarDirectores();
      });
    }
  };

  const editar = (director) => {
    setEditId(director._id);
    setForm({
      nombre: director.nombre,
      estado: director.estado
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
        deleteDirector(id).then(() => {
          Swal.fire("Eliminado", "Director eliminado correctamente", "success");
          cargarDirectores();
        });
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2>Módulo de Director</h2>

      <div className="card p-3 mt-3">
        <h4>{editId ? "Editar Director" : "Crear Director"}</h4>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre del director"
          className="form-control mt-2"
          value={form.nombre}
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

        <button className="btn btn-primary mt-3" onClick={guardarDirector}>
          {editId ? "Actualizar" : "Guardar"}
        </button>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {directores.map((d) => (
            <tr key={d._id}>
              <td>{d.nombre}</td>
              <td>{d.estado}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editar(d)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminar(d._id)}>
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

export default DirectorPage;
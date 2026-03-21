import { useEffect, useState } from "react";
import { getProductoras, createProductora, updateProductora, deleteProductora } from "../../services/productoraService";
import Swal from "sweetalert2";

function ProductoraPage() {
  const [productoras, setProductoras] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    slogan: "",
    descripcion: "",
    estado: "Activo"
  });
  const [editId, setEditId] = useState(null);

  const cargarProductoras = () => {
    getProductoras().then(res => setProductoras(res.data));
  };

  useEffect(() => {
    cargarProductoras();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarProductora = () => {
    if (!form.nombre.trim()) {
      Swal.fire("Error", "El nombre es obligatorio", "error");
      return;
    }

    if (editId) {
      updateProductora(editId, form).then(() => {
        Swal.fire("Actualizado", "Productora actualizada correctamente", "success");
        setEditId(null);
        setForm({ nombre: "", slogan: "", descripcion: "", estado: "Activo" });
        cargarProductoras();
      });
    } else {
      createProductora(form).then(() => {
        Swal.fire("Creado", "Productora creada correctamente", "success");
        setForm({ nombre: "", slogan: "", descripcion: "", estado: "Activo" });
        cargarProductoras();
      });
    }
  };

  const editar = (p) => {
    setEditId(p._id);
    setForm({
      nombre: p.nombre,
      slogan: p.slogan,
      descripcion: p.descripcion,
      estado: p.estado
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
        deleteProductora(id).then(() => {
          Swal.fire("Eliminado", "Productora eliminada correctamente", "success");
          cargarProductoras();
        });
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2>Módulo de Productora</h2>

      <div className="card p-3 mt-3">
        <h4>{editId ? "Editar Productora" : "Crear Productora"}</h4>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la productora"
          className="form-control mt-2"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          type="text"
          name="slogan"
          placeholder="Slogan"
          className="form-control mt-2"
          value={form.slogan}
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

        <button className="btn btn-primary mt-3" onClick={guardarProductora}>
          {editId ? "Actualizar" : "Guardar"}
        </button>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Slogan</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productoras.map((p) => (
            <tr key={p._id}>
              <td>{p.nombre}</td>
              <td>{p.slogan}</td>
              <td>{p.estado}</td>
              <td>{p.descripcion}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editar(p)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminar(p._id)}>
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

export default ProductoraPage;
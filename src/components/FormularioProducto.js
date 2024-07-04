//components/FormularioProducto.js
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const FormularioProducto = ({ agregarProducto }) => {
  const [producto, setProducto] = useState({ nombre: '', categoria: '', precio: '', imagen: '', descripcion: '' });
  const [archivoImagen, setArchivoImagen] = useState(null);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const manejarCambioImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProducto({ ...producto, imagen: reader.result });
      };
      reader.readAsDataURL(file);
      setArchivoImagen(file);
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (producto.nombre && !isNaN(producto.precio)) {
      agregarProducto({ ...producto, id: uuidv4() });
      setProducto({ nombre: '', categoria: '', precio: '', imagen: '', descripcion: '' });
      setArchivoImagen(null);
    } else {
      alert('Por favor ingrese detalles válidos del producto.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Agregar Nuevo Producto</Card.Title>
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre del Producto"
              value={producto.nombre}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              name="categoria"
              placeholder="Categoría"
              value={producto.categoria}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              placeholder="Precio"
              value={producto.precio}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              placeholder="Descripción del Producto"
              value={producto.descripcion}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen del Producto</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={manejarCambioImagen}
            />
            {archivoImagen && <img src={URL.createObjectURL(archivoImagen)} alt="Vista previa" style={{ maxWidth: '100%', marginTop: '10px' }} />}
          </Form.Group>
          <Button variant="primary" type="submit">
            Agregar Producto
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormularioProducto;

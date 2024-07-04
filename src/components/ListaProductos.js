//components/ListaProductos.js
import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ListaProductos.css'; // Importa el archivo CSS desde la carpeta components

const ListaProductos = ({ productos, eliminarProducto, editarProducto, mostrarEditar, mostrarEliminar }) => {
  return (
    <Row>
      {productos.map((producto) => (
        <Col md={6} lg={4} key={producto.id} className="mb-4">
          <Card className="product-card shadow-sm h-100">
            {producto.imagen ? (
              <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} className="product-img" />
            ) : (
              <div className="card-img-placeholder" />
            )}
            <Card.Body>
              <Card.Title className="product-title">
                <Link to={`/producto/${producto.id}`} className="product-link">
                  {producto.nombre}
                </Link>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{producto.categoria}</Card.Subtitle>
              <Card.Text className="product-price">${producto.precio}</Card.Text>
              <Card.Text className="product-description">{producto.descripcion}</Card.Text> {/* Añadir la descripción aquí */}
            </Card.Body>
            {(mostrarEditar || mostrarEliminar) && (
              <Card.Footer className="d-flex justify-content-between">
                {mostrarEditar && (
                  <Button variant="secondary" onClick={() => editarProducto(producto)} className="edit-button">
                    Editar
                  </Button>
                )}
                {mostrarEliminar && (
                  <Button variant="danger" onClick={() => eliminarProducto(producto.id)} className="delete-button">
                    Eliminar
                  </Button>
                )}
              </Card.Footer>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ListaProductos;

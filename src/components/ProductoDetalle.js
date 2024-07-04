//components/ProductoDetalle.js
import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductoDetalle.css'; // Importa el archivo CSS para los estilos

const ProductoDetalle = ({ productos }) => {
  const { id } = useParams();
  const producto = productos.find((producto) => producto.id === id);
  const navigate = useNavigate();

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <Container className="mt-5 contenedor-detalle-producto">
      <Button variant="primary" onClick={() => navigate(-1)}>Volver</Button>
      <Card className="tarjeta-principal-detalle-producto">
        <Row className="justify-content-center mt-3">
          <Col md={8}>
            <Card className="tarjeta-detalle-producto">
              <div className="seccion-titulo-producto">
                <h2 className="titulo-producto">{producto.nombre}</h2>
              </div>
              <div className="seccion-imagen-producto">
                {producto.imagen ? (
                  <img src={producto.imagen} alt={producto.nombre} className="imagen-detalle-producto" />
                ) : (
                  <div className="marcador-imagen-placeholder" />
                )}
              </div>
              <div className="seccion-precio-producto">
                <p className="etiqueta-precio-producto">Precio</p>
                <h3 className="precio-producto">${producto.precio}</h3>
              </div>
            </Card>
          </Col>
          <Col md={8} className="mt-3">
            <Card className="tarjeta-descripcion-producto">
              <div className="seccion-descripcion-producto">
                <h4 className="categoria-producto text-muted">{producto.categoria}</h4>
                <p className="descripcion-producto">{producto.descripcion}</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProductoDetalle;

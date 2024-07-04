// App.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormularioProducto from './components/FormularioProducto';
import ListaProductos from './components/ListaProductos';
import ProductoDetalle from './components/ProductoDetalle';
import VentanaConfirmacion from './components/VentanaConfirmacion';
import Paginacion from './components/Paginacion';
import Home from './components/Home';

const App = () => {
  const [productos, setProductos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina] = useState(20);

  useEffect(() => {
    const productosAlmacenados = JSON.parse(localStorage.getItem('productos'));
    if (productosAlmacenados) {
      setProductos(productosAlmacenados);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = (producto) => {
    setProductos([...productos, producto]);
  };

  const manejarEliminar = (id) => {
    setProductoAEliminar(id);
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = () => {
    setProductos(productos.filter((producto) => producto.id !== productoAEliminar));
    setMostrarConfirmacion(false);
    setProductoAEliminar(null);
  };

  const cancelarEliminar = () => {
    setMostrarConfirmacion(false);
    setProductoAEliminar(null);
  };

  const editarProducto = (productoActualizado) => {
    setProductos(productos.map((producto) => (producto.id === productoActualizado.id ? productoActualizado : producto)));
  };

  const productosFiltrados = productos.filter((producto) =>
    (producto.nombre && producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
    (producto.categoria && producto.categoria.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
    (producto.descripcion && producto.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()))
  );

  // Obtener productos actuales
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

  const paginar = numeroDePagina => setPaginaActual(numeroDePagina);

  return (
    <Router>
      <Container className="mt-5">
        <h1 className="text-center mb-4">Catálogo de Productos</h1>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">Inicio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/crud">CRUD</Nav.Link>
              <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Buscar productos..."
                className="mr-2"
                aria-label="Search"
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crud" element={
            <>
              <Row>
                <Col md={4}>
                  <FormularioProducto agregarProducto={agregarProducto} />
                </Col>
                <Col md={8}>
                  <ListaProductos 
                    productos={productosActuales} 
                    eliminarProducto={manejarEliminar} 
                    editarProducto={editarProducto} 
                    mostrarEditar={true} // Mostrar el botón de editar
                    mostrarEliminar={true} // Mostrar el botón de eliminar
                  />
                </Col>
              </Row>
              <Paginacion
                productosPorPagina={productosPorPagina}
                totalProductos={productosFiltrados.length}
                paginar={paginar}
              />
            </>
          } />
          <Route path="/catalogo" element={
            <>
              <ListaProductos 
                productos={productosActuales} 
                mostrarEditar={false} // No mostrar el botón de editar
                mostrarEliminar={false} // No mostrar el botón de eliminar
              />
              <Paginacion
                productosPorPagina={productosPorPagina}
                totalProductos={productosFiltrados.length}
                paginar={paginar}
              />
            </>
          } />
          <Route path="/producto/:id" element={<ProductoDetalle productos={productos} />} />
        </Routes>
        <VentanaConfirmacion
          mostrar={mostrarConfirmacion}
          manejarCerrar={cancelarEliminar}
          manejarConfirmar={confirmarEliminar}
          mensaje="¿Estás seguro que deseas eliminar este producto?"
        />
      </Container>
    </Router>
  );
};

export default App;

//components/BarraBusqueda.js
import React from 'react';
import { Form } from 'react-bootstrap';

const BarraBusqueda = ({ terminoBusqueda, setTerminoBusqueda }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Buscar productos..."
      value={terminoBusqueda}
      onChange={(e) => setTerminoBusqueda(e.target.value)}
    />
  );
};

export default BarraBusqueda;

//components/VentanaConfirmacion.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const VentanaConfirmacion = ({ mostrar, manejarCerrar, manejarConfirmar, mensaje }) => {
  return (
    <Modal show={mostrar} onHide={manejarCerrar} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={manejarCerrar}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={manejarConfirmar}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VentanaConfirmacion;

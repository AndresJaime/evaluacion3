//components/Paginacion.js
import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginacion = ({ productosPorPagina, totalProductos, paginar }) => {
  const numeroDePaginas = [];

  for (let i = 1; i <= Math.ceil(totalProductos / productosPorPagina); i++) {
    numeroDePaginas.push(i);
  }

  return (
    <Pagination>
      {numeroDePaginas.map(numero => (
        <Pagination.Item key={numero} onClick={() => paginar(numero)}>
          {numero}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Paginacion;

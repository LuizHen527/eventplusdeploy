import React from 'react';

import "./TableCom.css";

const TableCom = ({ dados }) => {
    return (
      <table className="tbal-data">
        <thead className="tbal-data__head">
          <tr className="tbal-data__head-row tbal-data__head-row--red-color">
            <th className="tbal-data__head-title tbal-data__head-title--big">
              Evento
            </th>
            {/* <th className="tbal-data__head-title tbal-data__head-title--big">
              Descrição
            </th> */}
            {/* <th className="tbal-data__head-title tbal-data__head-title--big">
              Tipo
            </th> */}
            <th className="tbal-data__head-title tbal-data__head-title--big">
              Data
            </th>
            <th className="tbal-data__head-title tbal-data__head-title--big">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {dados.map((e) => {
            return (
                <div>

                </div>
            );
          })}
        </tbody>
      </table>
    );
  };

export default TableCom;
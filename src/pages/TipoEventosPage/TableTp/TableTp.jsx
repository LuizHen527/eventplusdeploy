import React from 'react';
import './TableTp.css'

import edtiPen from '../../../assets/images/edit-pen.svg'
import trashDelete from '../../../assets/images/trash-delete.svg'


const TableTp = ({ dados, fnDelete = null, fnUpdate = null, setFrmEdit = null}) => {
    return (
        <table className='table-data'>
            
            {/* Cabecalho */}

            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">Título</th>
                    <th className="table-data__head-title table-data__head-title--little">Editar</th>
                    <th className="table-data__head-title table-data__head-title--little">Deletar</th>
                </tr>
            </thead>

            {/* Corpo */}

            <tbody>
                {dados.map((tp) => {
                    return(
                        <tr className="table-data__head-row" key={tp.idTipoEvento}>
                        <td className="table-data__data table-data__data--big">
                            {tp.titulo}
                        </td>
        
                        <td className="table-data__data table-data__data--little">
                            <img 
                            className="table-data__icon" 
                            src={edtiPen} 
                            onClick={() => {
                                fnUpdate(tp.idTipoEvento)
                            }} 
                            alt="" 
                            />
                        </td>
        
                        <td className="table-data__data table-data__data--little" >
                            <img 
                            className="table-data__icon" 
                            src={trashDelete} 
                            alt="" 
                            onClick={(e) => {
                                fnDelete(tp.idTipoEvento)
                            }} 
                            />
                        </td>
                        </tr>
                    );
                })}

            </tbody>

        </table>
    );
};

export default TableTp;
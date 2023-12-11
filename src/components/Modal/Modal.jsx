import React, { useContext, useEffect } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";
import { UserContext } from "../../context/AuthContext";

import { Button, Input } from "../FormComponents/FormComponents";
import "./Modal.css";

const Modal = ({
  modalTitle = "Feedback",
  comentaryText = "Não informado. Não informado. Não informado.",
  //userId = null,
  showHideModal,
  fnDelete = null,
  fnGet = null,
  fnPost = null,
  fnNewCommentary = null,
  novoComentario = null,
  setNovoComentario = null

}) => {

  const {userData} = useContext(UserContext);
  //console.clear();
  console.log(userData);

  useEffect(() => {
    async function pegarDados()
    {
      await fnGet();
    }

    pegarDados();
    
  }, [novoComentario])

  return (
    <div className="modal">
      <article className="modal__box">
        
        <h3 className="modal__title">
          {modalTitle}
          <span className="modal__close" onClick={()=> showHideModal(true)}>x</span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          <img
            src={trashDelete}
            className="comentary__icon-delete"
            alt="Ícone de uma lixeira"
            onClick={() => {fnDelete()}}
          />

          <p className="comentary__text">{comentaryText}</p>

          <hr className="comentary__separator" />
        </div>

        <Input
          placeholder="Escreva seu comentário..."
          className="comentary__entry"
          value={novoComentario.descricao}
          manipulationFunction={(n) => {
            setNovoComentario({
                descricao: n.target.value
            });
          }}
        />

        <Button
          textButton="Comentar"
          className="comentary__button"
          manipulationFunction={(c) => {fnPost()}}
        />
      </article>
    </div>
  );
};

export default Modal;

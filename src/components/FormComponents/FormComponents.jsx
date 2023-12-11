import React from 'react';
import './FormComponents.css'

export const Input = (
  {  type,
    id,
    value,
    required,
    name,
    placeholder,
    manipulationFunction,
    addicionalClass = ""}
) => {
    return (
        <input 
        type={type}
        id={id}
        name={name}
        value={value}
        required={required ? "required" : ""}
        className={`input-component ${addicionalClass}`}
        placeholder={placeholder}
        onChange={manipulationFunction}
        autoComplete='off' />
    );
};

export const Label = ({htmlFor, labelText}) =>{
    return <label htmlFor={htmlFor}>{labelText}</label>
};

export const Button = ( props ) => {
    return(
        <button
        id={props.id}
        name={props.name}
        type={props.type}
        className={`button-component ${props.additionalClass}`}
        onClick={props.manipulationFunction}
        >
            {props.textButton}
        </button>
    )
}

export const Select = ({
    required,
    id,
    name,
    options,
    defaultValue,
    addicionalClass = "",
    manipulationFunction
}) => {
    return (
        <select 
        name={name}
        id={id}
        required={required ? "required" : ""}
        className={`input-component ${addicionalClass}`}
        onChange={manipulationFunction}
        value={defaultValue}
        >

            <option value={0}>Selecione</option>
            {options.map((o) => {
                return(
                    <option key={o.value} value={o.value}>{o.text}</option>
                );
            })}

        </select>
    );
}
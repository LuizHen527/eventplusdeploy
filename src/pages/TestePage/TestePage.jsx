import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
//import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';

const TestePage = () => {
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [total, setTotal] = useState(0);

    function handleCalcular(e) {
        e.preventDefault();
        setTotal(parseFloat(n1) + parseFloat(n2));
    }

    const [count, setCount] = useState(0);
    const[calculation, setCalculation] = useState(0);

    useEffect(() => {
        setCalculation( count * 2 );
    });

    return (
        <div>
            <h1>Pagina de POCs - Prova de conceitos</h1>

            <p>Count: {count}</p>

            <button onClick={() => setCount((c) => c + 1)}>+</button>

            <p>Calculation: {calculation}</p>

            {/* <h2>Calculator</h2>

            <form action="" onSubmit={handleCalcular}>
                <Input type="number" placeholder="Digite o numero 1" name="n1" id="n1" value={n1} onChange={(e) => {setN1(e.target.value)}}/>
                <br />
                <Input type="number" placeholder="Digite o numero 2" name="n1" id="n2" value={n2} onChange={(e) => {setN2(e.target.value)}}/>
                <br />
                <Button textButton="Calcular" type="submit"/>

                <span>Resultado: <strong id='res'>{total}</strong></span>
            </form> */}
        </div>
    );
};

export default TestePage;
const Contador = () => {

    const [contador, setContador] = React.useState(0);

    const cambiarContador = (valor) => setContador(contador + valor)

    return(
        <div>
            <h1 className={contador % 5 == 0 ? "red-text" : ""}>Contador: {contador}</h1>
            <hr/>
            <button onClick={() => cambiarContador(5)}>PLUS</button>
            <button onClick={() => cambiarContador(-2)}>MINUS</button>
        </div>
    );
}
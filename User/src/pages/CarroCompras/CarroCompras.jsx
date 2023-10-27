import ListaEndereco from "../../components/ListaEndereco/ListaEndereco"
import styles from "./Carrinho.module.css"

function CarroCompras() {
    return (
        <div className={styles.carrinhoStyle}>
            <ListaEndereco />
        </div>
    )
}

export default CarroCompras;
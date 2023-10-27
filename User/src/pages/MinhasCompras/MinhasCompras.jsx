import ListaCompras from "../../components/ListaCompras/ListaCompras"
import styles from "./Compras.module.css"

const MinhasCompras = () => {
    return (
        <div className={styles.comprasStyle}>
            <ListaCompras  />
        </div>
    )
}

export default MinhasCompras
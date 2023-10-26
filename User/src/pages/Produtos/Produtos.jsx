import ListaProdutos from '../../components/ListaProdutos/ListaProdutos';
import styles from './Produtos.module.css';

const Produtos = () => {
    return (
        <div className={styles.produtosStyle}>
        <ListaProdutos />
        </div>
    );
    }

export default Produtos;
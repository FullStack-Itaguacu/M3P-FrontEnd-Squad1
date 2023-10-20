export const adicionarProdutoAoCarrinho = (produto, quantidade, quantidades, setCarrinho) => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const quantidadeDoProduto = quantidades[produto.id]  ;
  
    if (quantidadeDoProduto <= produto.total_stock) {
      const produtoNoCarrinhoIndex = carrinho.findIndex(
        (item) => item.id === produto.id
      );
  
      if (produtoNoCarrinhoIndex !== -1) {
        carrinho[produtoNoCarrinhoIndex].amount_buy += quantidadeDoProduto;
      } else {
        carrinho.push({
          ...produto,
          amount_buy: quantidadeDoProduto,
        });
      }
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      setCarrinho(carrinho.length);
      localStorage.setItem("quantidade_carrinho", carrinho.length);
      return { success: true, message: "Atualizamos seu carrinho.." };
    } else {
      return { success: false, message: "Quantidade indisponível" };
    }
  };
  
  export const incrementarQuantidade = (produtoId, quantidades, setQuantidades) => {
    const quantidadeAtual = quantidades[produtoId] || 0;
    const novaQuantidade = quantidadeAtual + 1;
    setQuantidades({ ...quantidades, [produtoId]: novaQuantidade });
  };
  
  export const decrementarQuantidade = (produtoId, quantidades, setQuantidades) => {
    const quantidadeAtual = quantidades[produtoId] || 0;
      const novaQuantidade = quantidadeAtual - 1;
      setQuantidades({ ...quantidades, [produtoId]: novaQuantidade });
    
  };
  
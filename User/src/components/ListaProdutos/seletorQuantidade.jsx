import React from 'react';
import PropTypes from 'prop-types';

function SeletorQuantidade({ quantidade, maxQuantidade, onIncrement, onDecrement }) {
  return (
    <div className="seletor-quantidade">
      <button onClick={onDecrement} className='bg-secondary '>-</button>
      <span className='m-2'>{quantidade}</span>
      <button onClick={onIncrement} className=''> + </button>
      <p>de {maxQuantidade} disponíveis</p>
    </div>
  );
}

SeletorQuantidade.propTypes = {
  quantidade: PropTypes.number.isRequired,
  maxQuantidade: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

export default SeletorQuantidade;

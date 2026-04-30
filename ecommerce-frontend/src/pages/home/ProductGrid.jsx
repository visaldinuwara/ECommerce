import { formatMoney } from '../../utils/money';
import { useState } from 'react';
import axios from 'axios';
import {Product} from './product';

export function ProductsGrid({ products, loadCart }) {
  return (
    <Product products={products} loadCart={loadCart}/>

  )
}
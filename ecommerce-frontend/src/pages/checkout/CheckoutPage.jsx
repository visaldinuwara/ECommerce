import './checkout-header.css';
import './CheckoutPage.css';
import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { OrderSummary } from './OrderSummery';

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckOutData = async () => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
      response = awaitaxios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    }
    fetchCheckOutData();
  }, []);
  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link"
              href="/">3 items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
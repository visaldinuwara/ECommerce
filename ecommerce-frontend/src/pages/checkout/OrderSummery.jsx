import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { formatMoney } from '../../utils/money';

export function OrderSummary({ cart, deliveryOptions, paymentSummary,loadCart }) {

  const navigate=useNavigate();
  const createOrder=async()=>{
    await axios.post('/api/orders');
    await loadCart();
    navigate('/orders');
  }
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        const selectDeliveryOption = deliveryOptions
          .find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          });
          const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${cartItem.id}`);
            await loadCart();
          };
        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(selectDeliveryOption.estimatedDeliveryTimes).format('dddd,MMMM D')}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={cartItem.product.image} />

              <div className="cart-item-details">
                <div className="product-name">
                  {cartItem.product.name}
                </div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary"
                   onClick={deleteCartItem}
                   >
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryOptions.map((deliveryOption) => {
                  let priceString = 'FREE Shipping';
                  if (deliveryOption.priceCents > 0) {
                    priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`
                  };
                  const updateDeliveryOption = async () => {
                      await axios.put(`/api/cart-items/${cartItem.id}`,{
                        deliveryOptionId: deliveryOption.id
                      });
                      await loadCart();
                  };
                  return (
                    <div key={deliveryOption.id} className="delivery-option"
                      onClick={updateDeliveryOption}
                    >
                      <input type="radio"
                        checked={deliveryOption.id === cartItem.deliveryOptionId}
                        onChange={() => {}}
                        className="delivery-option-input"
                        name={`delivery-option-${cartItem.productId}`} />
                      <div>
                        <div className="delivery-option-date">
                          {dayjs(deliveryOption.estimatedDeliveryTimes).format('dddd, MMMM D')}
                        </div>
                        <div className="delivery-option-price">
                          {priceString}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      <div className="payment-summary">
        <div className="payment-summary-title">
          Payment Summary
        </div>
        {paymentSummary && (
          <>
            <div className="payment-summary-row">
              <div>Items ({paymentSummary.totalItems}):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCesnts)}</div>
            </div>

            <button className="place-order-button button-primary" onClick={createOrder}>
              Place your order
            </button>
          </>
        )}
      </div>
    </div>
  )
}
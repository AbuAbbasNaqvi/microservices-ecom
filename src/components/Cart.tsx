import React from 'react';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {state.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) },
                    })
                  }
                  className="text-gray-500 hover:text-gray-700"
                >
                  <MinusCircle size={20} />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: { id: item.id, quantity: item.quantity + 1 },
                    })
                  }
                  className="text-gray-500 hover:text-gray-700"
                >
                  <PlusCircle size={20} />
                </button>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
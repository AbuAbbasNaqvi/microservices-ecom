import React, { useState } from 'react';
import { ShoppingCart as CartIcon, Package, FileQuestion } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { RequestForm } from './components/RequestForm';

const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    description: 'Premium wireless headphones with noise cancellation',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    description: 'Feature-rich smartwatch with health tracking',
  },
  {
    id: '3',
    name: 'Laptop',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    description: 'Powerful laptop for work and entertainment',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<'products' | 'cart' | 'request'>('products');

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold">E-Shop</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'products' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setActiveTab('cart')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'cart' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <CartIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveTab('request')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'request' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <FileQuestion className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SAMPLE_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          {activeTab === 'cart' && <Cart />}
          {activeTab === 'request' && <RequestForm />}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
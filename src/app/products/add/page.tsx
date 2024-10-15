'use client'

import React, { useState } from 'react';
import AuthenticatedLayout from '../../components/AuthenticatedLayout';
import axios from 'axios';

export default function NewProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const inputStyles = "w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  
  async function createProduct(event: React.FormEvent) {
    event.preventDefault();
    const data = {title, description, price};
    await axios.post('/api/products', data);
    

    }

  return (
    <AuthenticatedLayout>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">Add New Product</h1>
      <form onSubmit={createProduct} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Product Name"
              value={title}
              onChange={ev => setTitle(ev.target.value)}
              className={inputStyles}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              onChange={ev => setPrice(parseFloat(ev.target.value))}
              className={inputStyles}
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Product Description"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            className={`${inputStyles} h-32 resize-none` }
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
    </AuthenticatedLayout>
  );
}
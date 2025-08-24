"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    image_url: '',
    weight: '',
    category: 'Chai Powder',
    features: '',
    tags: '',
    stock_quantity: '',
    is_popular: false
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('adminToken');
      
      // Prepare data
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        features: formData.features ? formData.features.split(',').map(f => f.trim()).filter(f => f) : [],
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : []
      };

      const response = await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ text: 'Product created successfully!', type: 'success' });
        setTimeout(() => {
          router.push('/admin/products');
        }, 2000);
      } else {
        setMessage({ text: result.message || 'Failed to create product', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error creating product', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle image file selection and upload to Next.js API
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || 'Upload failed');
      }
      setFormData(prev => ({ ...prev, image_url: data.url }));
    } catch (err: any) {
      setUploadError(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Back to Products
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-2">Create a new tea product for your store</p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="e.g., Premium Masala Chai"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              >
                <option value="Chai Powder">Chai Powder</option>
                <option value="Tea Leaves">Tea Leaves</option>
                <option value="Masala/Spices">Masala/Spices</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="1"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="250"
              />
            </div>

            <div>
              <label htmlFor="original_price" className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                id="original_price"
                name="original_price"
                min="1"
                step="0.01"
                value={formData.original_price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="300 (for discount display)"
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                Weight/Size
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="250g, 500ml, etc."
              />
            </div>

            <div>
              <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                required
                min="0"
                value={formData.stock_quantity}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="50"
              />
            </div>
          </div>

          {/* Product Image Upload */}
          <div>
            <label htmlFor="image_file" className="block text-sm font-medium text-gray-700 mb-2">
              Product Image *
            </label>
            <input
              type="file"
              id="image_file"
              name="image_file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
            />
            {uploading && (
              <p className="text-sm text-gray-600 mt-2">Uploading image...</p>
            )}
            {uploadError && (
              <p className="text-sm text-red-600 mt-2">{uploadError}</p>
            )}
            {formData.image_url && (
              <div className="mt-3 flex items-center gap-4">
                <img src={formData.image_url} alt="Preview" className="h-20 w-20 object-cover rounded border" />
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  readOnly
                  value={formData.image_url}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded bg-gray-50"
                />
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Images are saved to /public/images and served at /images/...</p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Product Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-vertical"
              placeholder="Describe your product - ingredients, taste, benefits, etc."
            />
          </div>

          {/* Features and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-2">
                Features (comma separated)
              </label>
              <input
                type="text"
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="Natural Jaggery, Premium Quality, Rich Flavor"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="Bestseller, Organic"
              />
            </div>
          </div>

          {/* Popular Product Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_popular"
              name="is_popular"
              checked={formData.is_popular}
              onChange={handleChange}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="is_popular" className="ml-2 block text-sm text-gray-900">
              Mark as Popular Product
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </div>
              ) : (
                '🚀 Create Product'
              )}
            </button>
            
            <Link
              href="/admin/products"
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

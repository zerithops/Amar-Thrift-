
import React, { useState } from 'react';
import { Product, OrderMessage } from '../types';

interface ProductGridProps {
  products: Product[];
  onOrderMessage: (message: OrderMessage) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onOrderMessage }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setIsSubmitting(true);
    
    const newMessage: OrderMessage = {
      id: Math.random().toString(36).substring(7),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      customerName: orderForm.name,
      customerPhone: orderForm.phone,
      message: orderForm.note,
      timestamp: Date.now(),
    };

    setTimeout(() => {
      onOrderMessage(newMessage);
      setIsSubmitting(false);
      setShowSuccess(true);
      setOrderForm({ name: '', phone: '', note: '' });
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedProduct(null);
      }, 2000);
    }, 1000);
  };

  return (
    <section id="collection" className="bg-[#FDFCFB] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="animate-fade-up">
            <h2 className="text-5xl md:text-7xl font-bold text-stone-900 serif mb-4 italic">The Archive</h2>
            <div className="h-1 w-24 bg-[#C5A059]"></div>
          </div>
          <div className="text-stone-400 text-[10px] font-black tracking-[0.4em] uppercase animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {products.length} CURATED PIECES
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
          {products.map((product, idx) => (
            <div 
              key={product.id} 
              className="group animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-8 cursor-pointer">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1594932224828-b4b059b6f6f2?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                   <span className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white text-[10px] font-black tracking-[0.5em] uppercase border border-white px-6 py-3">
                     View details
                   </span>
                </div>
                <div className="absolute top-0 right-0 bg-[#C5A059] text-white text-[9px] font-black px-4 py-2 uppercase tracking-widest">
                  {product.condition}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-medium serif text-stone-900 group-hover:text-[#C5A059] transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-sm font-light text-stone-500 tracking-widest">৳{product.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">
                  <span>Size: {product.size}</span>
                  <span className="w-1 h-1 rounded-full bg-stone-200"></span>
                  <span>{product.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-900/90 backdrop-blur-md overflow-y-auto">
          <div className="bg-white w-full max-w-6xl flex flex-col lg:flex-row relative animate-fade-up">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-10 p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400 hover:text-stone-900"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full lg:w-3/5 aspect-[4/5] bg-stone-100 overflow-hidden">
              <img 
                src={selectedProduct.imageUrl} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full lg:w-2/5 p-10 md:p-16 overflow-y-auto max-h-screen custom-scrollbar bg-[#FDFCFB]">
              <div className="mb-12">
                <span className="text-[10px] font-black tracking-[0.3em] text-[#C5A059] uppercase block mb-4">
                  {selectedProduct.category} Collection
                </span>
                <h2 className="text-5xl font-bold text-stone-900 serif mb-6 italic leading-tight">{selectedProduct.name}</h2>
                <p className="text-3xl font-light text-stone-400 mb-8">৳{selectedProduct.price.toLocaleString()}</p>
                
                <div className="grid grid-cols-2 border-y border-stone-100 py-6 mb-10">
                  <div>
                    <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Authentic Size</span>
                    <span className="text-sm font-bold text-stone-900 uppercase">{selectedProduct.size}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Condition Profile</span>
                    <span className="text-sm font-bold text-stone-900 uppercase">{selectedProduct.condition}</span>
                  </div>
                </div>

                <div className="mb-12">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-900 mb-4">The Story</h4>
                  <p className="text-stone-500 leading-relaxed font-light italic">"{selectedProduct.description}"</p>
                </div>
              </div>

              {!showSuccess ? (
                <div className="bg-stone-50 p-8 border border-stone-100 rounded">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-stone-900 mb-6">Reservation Inquiry</h4>
                  <form onSubmit={handleOrder} className="space-y-6">
                    <input 
                      type="text" required
                      placeholder="Full Name"
                      className="w-full p-4 bg-white border border-stone-200 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                    />
                    <input 
                      type="tel" required
                      placeholder="WhatsApp / Phone (+880)"
                      className="w-full p-4 bg-white border border-stone-200 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                    />
                    <textarea 
                      placeholder="Additional details (Size verification, delivery location...)"
                      className="w-full p-4 bg-white border border-stone-200 text-sm focus:outline-none focus:border-[#C5A059] transition-colors min-h-[120px]"
                      value={orderForm.note}
                      onChange={(e) => setOrderForm({...orderForm, note: e.target.value})}
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-stone-900 text-white py-5 font-black tracking-[0.3em] text-[10px] uppercase hover:bg-[#C5A059] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'PROCESSING...' : 'REQUEST RESERVATION'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 animate-fade-up">
                  <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-stone-900 serif mb-4">Request Received</h3>
                  <p className="text-stone-500 text-center font-light italic">Our concierge will contact you on WhatsApp within 12 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;


import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';
import Logo from './Logo';

interface AdminPanelProps {
  products: Product[];
  onAdd: (product: Product) => void;
  onDelete: (id: string) => void;
  isLoggedIn: boolean;
  onLogin: (password: string) => boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onAdd, onDelete, isLoggedIn, onLogin }) => {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'T-Shirt',
    size: '',
    condition: 'Excellent' as Product['condition'],
    imageUrl: '',
    description: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(password)) {
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeminiDescription = async () => {
    if (!newProduct.name) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(newProduct.name, newProduct.category, newProduct.condition);
    setNewProduct({ ...newProduct, description: desc });
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Math.random().toString(36).substring(7),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      size: newProduct.size,
      condition: newProduct.condition,
      imageUrl: newProduct.imageUrl || `https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800`,
      description: newProduct.description,
      createdAt: Date.now()
    };
    onAdd(product);
    setNewProduct({
      name: '',
      price: '',
      category: 'T-Shirt',
      size: '',
      condition: 'Excellent',
      imageUrl: '',
      description: ''
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 bg-[#121212] flex items-center justify-center px-6">
        <div className="w-full max-w-lg bg-[#1a1a1a] border border-stone-800 p-12 shadow-2xl animate-fade-up">
          <div className="flex justify-center mb-12">
            <Logo light className="h-20" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-8 text-center serif tracking-widest italic uppercase">Studio Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-stone-500 mb-4">Verification Key</label>
              <input 
                type="password" 
                required
                className="w-full p-5 bg-[#121212] border border-stone-800 rounded text-white text-center text-lg tracking-[0.5em] focus:outline-none focus:border-[#C5A059] transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loginError && (
              <p className="text-[#C5A059] text-[10px] font-black uppercase tracking-widest text-center">Unauthorized Sequence Detected</p>
            )}
            <button className="w-full bg-[#C5A059] text-white py-5 font-black tracking-[0.4em] uppercase text-xs hover:bg-white hover:text-stone-900 transition-all">
              ENTER STUDIO
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16 border-b border-stone-200 pb-12">
          <div>
            <h2 className="text-6xl font-bold text-stone-900 serif italic">Inventory Studio</h2>
            <p className="text-stone-400 mt-4 uppercase tracking-[0.3em] font-bold text-[10px]">Curation Management Center</p>
          </div>
          <div className="text-stone-400 text-xs font-mono">
            LIVE: {products.length} OBJECTS
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Listing Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-stone-900 mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-stone-900"></span>
                List New Archival Object
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 shadow-xl border border-stone-100">
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Item Nomenclature</label>
                    <input 
                      type="text" required
                      className="w-full p-4 bg-stone-50 border-b border-stone-200 focus:outline-none focus:border-[#C5A059] transition-all text-stone-900 italic serif text-lg"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="e.g. 1994 Italian Linen Overcoat"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Value (BDT)</label>
                      <input 
                        type="number" required
                        className="w-full p-4 bg-stone-50 border-b border-stone-200 focus:outline-none focus:border-[#C5A059] transition-all font-mono"
                        value={newProduct.price}
                        placeholder="৳"
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Category</label>
                      <select 
                        className="w-full p-4 bg-stone-50 border-b border-stone-200 focus:outline-none focus:border-[#C5A059] transition-all text-xs uppercase font-bold tracking-widest"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      >
                        <option value="T-Shirt">T-Shirts</option>
                        <option value="Shirts">Button Downs</option>
                        <option value="Baggy Jeans">Denim Archive</option>
                        <option value="Accessories">Objects</option>
                        <option value="Outerwear">Outerwear</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Scale / Size</label>
                      <input 
                        type="text" required
                        className="w-full p-4 bg-stone-50 border-b border-stone-200 focus:outline-none focus:border-[#C5A059] transition-all text-sm font-bold uppercase"
                        value={newProduct.size}
                        onChange={(e) => setNewProduct({...newProduct, size: e.target.value})}
                        placeholder="M / 32 / OS"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">State</label>
                      <select 
                        className="w-full p-4 bg-stone-50 border-b border-stone-200 focus:outline-none focus:border-[#C5A059] transition-all text-xs uppercase font-bold tracking-widest"
                        value={newProduct.condition}
                        onChange={(e) => setNewProduct({...newProduct, condition: e.target.value as any})}
                      >
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Fair</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Visual Documentation</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full aspect-video border-2 border-dashed border-stone-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#C5A059] transition-all group overflow-hidden relative bg-stone-50"
                    >
                      {newProduct.imageUrl ? (
                        <img src={newProduct.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <div className="text-center p-8">
                          <svg className="w-8 h-8 text-stone-300 mx-auto mb-4 group-hover:text-[#C5A059] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 group-hover:text-stone-900 transition-colors">Select Visual Frame</span>
                        </div>
                      )}
                      <input 
                        type="file" ref={fileInputRef} accept="image/*" className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">Curation Narrative</label>
                      <button 
                        type="button" onClick={handleGeminiDescription} disabled={isGenerating || !newProduct.name}
                        className="text-[9px] font-black text-[#C5A059] hover:underline tracking-widest uppercase flex items-center gap-2"
                      >
                        {isGenerating ? 'ANALYZING...' : 'AI ASSISTANT'}
                      </button>
                    </div>
                    <textarea 
                      required
                      className="w-full p-4 bg-stone-50 border-b border-stone-200 focus:outline-none focus:border-[#C5A059] transition-all text-sm italic min-h-[120px]"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      placeholder="The story behind this piece..."
                    />
                  </div>
                </div>

                <button className="w-full bg-stone-900 text-white py-6 font-black tracking-[0.4em] text-[10px] uppercase hover:bg-[#C5A059] transition-all shadow-2xl">
                  COMMIT TO ARCHIVE
                </button>
              </form>
            </div>
          </div>

          {/* Inventory List */}
          <div className="lg:col-span-7">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-stone-900 mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-stone-900"></span>
              Archival Catalog
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {products.map(product => (
                <div key={product.id} className="group bg-white border border-stone-100 p-6 flex items-center gap-8 hover:shadow-2xl transition-all">
                  <div className="w-24 h-32 flex-shrink-0 bg-stone-100 overflow-hidden">
                    <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xl font-bold serif italic text-stone-900">{product.name}</h4>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                          <span>{product.category}</span>
                          <span>৳{product.price.toLocaleString()}</span>
                          <span>{product.size}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => onDelete(product.id)}
                        className="p-3 text-stone-200 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-2 italic font-light">"{product.description}"</p>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="py-40 text-center border-2 border-dashed border-stone-100 rounded">
                  <p className="text-stone-300 font-black uppercase tracking-[0.3em] text-[10px]">Archive Empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

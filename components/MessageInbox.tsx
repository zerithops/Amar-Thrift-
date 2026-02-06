
import React from 'react';
import { OrderMessage } from '../types';

interface MessageInboxProps {
  messages: OrderMessage[];
}

const MessageInbox: React.FC<MessageInboxProps> = ({ messages }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold text-stone-900">Inbound Requests</h2>
          <p className="text-stone-500 mt-2">Manage customer inquiries and orders.</p>
        </div>
        <div className="text-stone-400 text-sm font-medium tracking-tighter uppercase">
          {messages.length} Total Messages
        </div>
      </div>

      <div className="space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex justify-between items-center">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                Product Ref: {msg.productName}
              </span>
              <span className="text-[10px] font-medium text-stone-400 italic">
                {new Date(msg.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 border-r border-stone-100 pr-8">
                <h4 className="text-xs font-bold text-stone-400 uppercase mb-3">Customer Details</h4>
                <div className="space-y-1">
                  <p className="text-xl font-bold text-stone-900">{msg.customerName}</p>
                  <p className="text-stone-600 font-mono">{msg.customerPhone}</p>
                </div>
                <div className="mt-6">
                  <a 
                    href={`tel:${msg.customerPhone}`}
                    className="inline-flex items-center text-xs font-bold text-stone-900 hover:underline underline-offset-4"
                  >
                    CALL CUSTOMER
                    <svg className="w-3 h-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-xs font-bold text-stone-400 uppercase mb-3">Message Content</h4>
                <p className="text-stone-700 leading-relaxed bg-stone-50 p-6 rounded-lg italic">
                  "{msg.message || 'Customer is interested in purchasing this item.'}"
                </p>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-32 bg-stone-50 border-2 border-dashed border-stone-200 rounded-3xl">
            <svg className="w-16 h-16 text-stone-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-stone-400 font-medium">Your inbox is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInbox;

import React from 'react';
import { OrderItem } from '../types';
import { PRODUCTS } from '../data';

interface InvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    data: {
        customerName: string;
        clientNumber: string;
        items: OrderItem[];
        pickupCharge: number;
        deliveryCharge: number;
        totalAmount: number;
        deliveryDate: string;
    };
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, onConfirm, data }) => {
    if (!isOpen) return null;

    const { customerName } = data;

    const formatCurrency = (amount: number) => amount.toFixed(0);

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:p-0 p-0 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-t-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-200 h-[90vh] flex flex-col">
                {/* Header */}
                <div className="bg-brand-green-600 p-6 text-white flex justify-between items-center shrink-0">
                    <h2 className="text-2xl font-bold">Vérification de la Facture</h2>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6 overflow-y-auto">
                    {/* Client Details */}
                    <div className="flex justify-between items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div>
                            <p className="text-sm text-slate-500 font-semibold uppercase">Client</p>
                            <p className="text-lg font-bold text-slate-800">{customerName}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500 font-semibold uppercase">N° Client</p>
                            <p className="text-lg font-bold text-slate-800">{data.clientNumber || '-'}</p>
                            {data.deliveryDate && (
                                <div className="mt-2">
                                    <p className="text-xs text-slate-500 font-semibold uppercase">Livraison</p>
                                    <p className="text-md font-bold text-brand-green-600">{new Date(data.deliveryDate).toLocaleDateString('fr-FR')}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="border rounded-xl overflow-hidden border-slate-200">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Article</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Qté</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Prix</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {data.items.map((item, index) => {
                                    const product = PRODUCTS.find(p => p.id === item.productId);
                                    const price = item.unitPrice;
                                    const total = price * item.quantity;
                                    return (
                                        <tr key={index}>
                                            <td className="px-4 py-3 text-sm text-slate-700 font-medium">{product?.name || 'Article Inconnu'}</td>
                                            <td className="px-4 py-3 text-sm text-slate-600 text-right">{item.quantity}</td>
                                            <td className="px-4 py-3 text-sm text-slate-600 text-right">{formatCurrency(price)}</td>
                                            <td className="px-4 py-3 text-sm text-slate-800 font-bold text-right">{formatCurrency(total)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                        <div className="flex justify-between text-slate-600">
                            <span>Frais de collecte</span>
                            <span>{formatCurrency(data.pickupCharge)} cfa</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Frais de livraison</span>
                            <span>{formatCurrency(data.deliveryCharge)} cfa</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                            <span className="text-xl font-bold text-slate-800">Total à Payer</span>
                            <span className="text-2xl font-extrabold text-brand-green-600">{formatCurrency(data.totalAmount)} cfa</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end space-x-4 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-slate-600 font-semibold hover:bg-slate-200 transition-colors"
                    >
                        Modifier
                    </button>
                    <button
                        onClick={onConfirm}
                        className="btn-primary px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-brand-green-500/30 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Confirmer & Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;

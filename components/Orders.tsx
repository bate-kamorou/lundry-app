
import React, { useState, useEffect } from 'react';
import type { OrderItem } from '../types';
import { CUSTOMERS, PRODUCTS, SERVICES, COLLECT_TYPES, DELIVERY_TYPES } from '../data';
import InvoiceModal from './InvoiceModal';

const Orders: React.FC = () => {
    const [customerName, setCustomerName] = useState('');
    const [clientNumber, setClientNumber] = useState('+228 ');
    const [service, setService] = useState(SERVICES[0]);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([
        { productId: '1', quantity: 2, unitPrice: 500 },
        { productId: '2', quantity: 1, unitPrice: 500 },
    ]);
    const [pickupCharge, setPickupCharge] = useState<number | string>(0);
    const [deliveryCharge, setDeliveryCharge] = useState<number | string>(0);
    const [pickupType, setPickupType] = useState(COLLECT_TYPES[0]);
    const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPES[0]);
    const [deliveryDate, setDeliveryDate] = useState('');

    const [subtotal, setSubtotal] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    useEffect(() => {
        const newSubtotal = orderItems.reduce((acc, item) => {
            return acc + (item.unitPrice * item.quantity);
        }, 0);
        setSubtotal(newSubtotal);

        const newTotalAmount = newSubtotal + (Number(pickupCharge) || 0) + (Number(deliveryCharge) || 0);
        setTotalAmount(newTotalAmount);
    }, [orderItems, pickupCharge, deliveryCharge]);

    const handleItemChange = <K extends keyof OrderItem,>(index: number, field: K, value: OrderItem[K]) => {
        const newItems = [...orderItems];
        newItems[index][field] = value;

        // If product changes, update unit price based on service type
        if (field === 'productId') {
            const product = PRODUCTS.find(p => p.id === value);
            if (product) {
                // If manual price service, keep 0 (or default?), user said "price for other services should be default to zero"
                // But for manual service, we want to allow editing. Let's set to product default initially?
                // User said "input... should not be reflected".
                // Let's stick to: if manual service, set to 0 (or keep previous if editing?).
                // Actually user said "price for other services should be default to zero".
                // Let's set to product price if NOT manual service. If manual, set to 0?
                // Wait, "price from the lavage a sec should be editable".
                // Logic for default price based on service
                if (service === 'Lavage et Repassage') {
                    // For Lavage et Repassage, default to product price but allow editing
                    newItems[index].unitPrice = product.price;
                } else if (['Nettoyage à sec', 'Repassage seul', 'Abonnement'].includes(service)) {
                    // For other manual services, default to 0
                    newItems[index].unitPrice = 0;
                } else {
                    // Should not happen if all are manual, but fallback to product price
                    newItems[index].unitPrice = product.price;
                }
            }
        }

        setOrderItems(newItems);
    };

    // Reset items/prices when service changes
    useEffect(() => {
        const newItems = orderItems.map(item => {
            const product = PRODUCTS.find(p => p.id === item.productId);
            // Reset logic:
            // Lavage et Repassage -> Product Price
            // Other Manual -> 0
            if (service === 'Lavage et Repassage') {
                return { ...item, unitPrice: product ? product.price : 0 };
            } else if (['Nettoyage à sec', 'Repassage seul', 'Abonnement'].includes(service)) {
                return { ...item, unitPrice: 0 };
            }
            return { ...item, unitPrice: product ? product.price : 0 };
        });
        setOrderItems(newItems);
    }, [service]);

    const addItem = () => {
        setOrderItems([...orderItems, { productId: '', quantity: 1, unitPrice: 0 }]);
    };

    const removeItem = (index: number) => {
        setOrderItems(orderItems.filter((_, i) => i !== index));
    };

    const formatCurrency = (amount: number) => {
        return amount.toFixed(0);
    };

    return (
        <div className="glass-panel p-8 rounded-2xl space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <h2 className="text-2xl font-bold text-slate-800">Créer une nouvelle commande</h2>
                <span className="px-3 py-1 bg-brand-green-100 text-brand-green-700 rounded-full text-sm font-medium">Nouveau</span>
            </div>

            {/* Customer & Service */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Client <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-green-500 focus:border-transparent transition-all outline-none"
                        placeholder="Nom du client"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Numéro de client</label>
                    <input
                        type="text"
                        value={clientNumber}
                        onChange={e => {
                            let val = e.target.value;

                            // Enforce +228 prefix
                            if (!val.startsWith('+228')) {
                                val = '+228 ' + val.replace(/^\+228\s*/, '');
                            }

                            // Remove all non-digit chars except the prefix
                            const rawDigits = val.substring(5).replace(/\D/g, '');

                            // Format: +228 XX XX XX XX
                            let formatted = '+228';
                            if (rawDigits.length > 0) formatted += ' ' + rawDigits.substring(0, 2);
                            if (rawDigits.length > 2) formatted += ' ' + rawDigits.substring(2, 4);
                            if (rawDigits.length > 4) formatted += ' ' + rawDigits.substring(4, 6);
                            if (rawDigits.length > 6) formatted += ' ' + rawDigits.substring(6, 8);

                            setClientNumber(formatted);
                        }}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-green-500 focus:border-transparent transition-all outline-none"
                        placeholder="ex : +228 90 00 01 02"
                        maxLength={20}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Service <span className="text-red-500">*</span></label>
                    <select value={service} onChange={e => setService(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-green-500 focus:border-transparent transition-all outline-none">
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-700 flex items-center">
                    <span className="w-1 h-5 bg-brand-green-400 rounded-full mr-2"></span>
                    Détails de la commande
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Produit *</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Quantité *</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Prix Unitaire</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Montant</th>
                                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {orderItems.map((item, index) => {
                                const product = PRODUCTS.find(p => p.id === item.productId);
                                return (
                                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select value={item.productId} onChange={e => handleItemChange(index, 'productId', e.target.value)} className="w-full p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500 outline-none">
                                                <option value="">Sélectionner...</option>
                                                {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)} min="1" className="w-24 p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500 outline-none" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">
                                            {['Nettoyage à sec', 'Repassage seul', 'Abonnement', 'Lavage et Repassage'].includes(service) ? (
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        value={item.unitPrice === 0 ? '' : item.unitPrice}
                                                        onChange={e => {
                                                            const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                                                            handleItemChange(index, 'unitPrice', isNaN(val) ? 0 : Math.max(0, val));
                                                        }}
                                                        placeholder="0"
                                                        className="w-32 p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500 outline-none text-right"
                                                        min="0"
                                                    />
                                                    <span className="absolute right-8 top-2 text-slate-400 text-xs">cfa</span>
                                                </div>
                                            ) : (
                                                `cfa ${formatCurrency(item.unitPrice)}`
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800"> cfa {formatCurrency(item.unitPrice * item.quantity)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => removeItem(index)} className="text-red-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <button onClick={addItem} className="flex items-center text-sm text-brand-green-600 font-bold hover:text-brand-green-700 transition-colors px-4 py-2 rounded-lg hover:bg-brand-green-50 w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                    Ajouter un nouvel article
                </button>
            </div>

            {/* Charges */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sous-total</label>
                        <p className="text-xl font-bold text-slate-700"> cfa {formatCurrency(subtotal)}</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Frais de collecte</label>
                        <div className="relative">
                            <input type="number" min="0" placeholder="0" value={pickupCharge === 0 ? '' : pickupCharge} onChange={e => setPickupCharge(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))} className="w-full p-2 bg-white border border-slate-200 rounded-lg pl-8 focus:ring-2 focus:ring-brand-green-500 outline-none" />
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">cfa</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Frais de livraison</label>
                        <div className="relative">
                            <input type="number" min="0" placeholder="0" value={deliveryCharge === 0 ? '' : deliveryCharge} onChange={e => setDeliveryCharge(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))} className="w-full p-2 bg-white border border-brand-green-200 rounded-lg pl-8 focus:ring-2 focus:ring-brand-green-500 outline-none" />
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">cfa</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end items-center">
                    <label className="text-lg font-bold text-slate-700 mr-4">Montant Total à Payer :</label>
                    <p className="text-4xl font-extrabold text-brand-green-600"> cfa {formatCurrency(totalAmount)}</p>
                </div>
            </div>

            {/* Pickup & Delivery */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-700 flex items-center">
                    <span className="w-1 h-5 bg-brand-green-400 rounded-full mr-2"></span>
                    Collecte & Livraison
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">Type de Collecte <span className="text-red-500">*</span></label>
                        <select value={pickupType} onChange={e => setPickupType(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-green-500 outline-none">
                            {COLLECT_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">Type de Livraison <span className="text-red-500">*</span></label>
                        <select value={deliveryType} onChange={e => setDeliveryType(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-green-500 outline-none">
                            {DELIVERY_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">Date de Livraison/Collecte <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            value={deliveryDate}
                            onChange={e => setDeliveryDate(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-green-500 outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-8 space-x-4">
                <button type="button" className="px-6 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 transition-colors">Annuler</button>
                <button
                    type="button"
                    onClick={() => {
                        if (!customerName.trim()) {
                            alert('Veuillez entrer le nom du client.');
                            return;
                        }
                        if (!clientNumber.trim() || clientNumber === '+228 ') {
                            alert('Veuillez entrer le numéro du client.');
                            return;
                        }
                        setIsReviewModalOpen(true);
                    }}
                    className="btn-primary px-8 py-3 rounded-xl font-bold shadow-lg shadow-brand-green-500/30"
                >
                    Soumettre la commande
                </button>
            </div>

            <InvoiceModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                onConfirm={() => {
                    const newOrder = {
                        id: Date.now().toString(),
                        date: new Date().toISOString(),
                        customerName,
                        clientNumber,
                        service,
                        items: orderItems,
                        pickupCharge: Number(pickupCharge) || 0,
                        deliveryCharge: Number(deliveryCharge) || 0,
                        pickupType,
                        deliveryType,
                        totalAmount,
                        deliveryDate,
                        status: 'En cours'
                    };

                    const existingOrders = JSON.parse(localStorage.getItem('laundry_orders') || '[]');
                    localStorage.setItem('laundry_orders', JSON.stringify([...existingOrders, newOrder]));

                    console.log('Order Submitted:', newOrder);
                    setIsReviewModalOpen(false);
                    alert('Commande enregistrée avec succès !');

                    // Reset form
                    setClientNumber('');
                    setOrderItems([{ productId: '1', quantity: 1, unitPrice: 500 }]);
                    setDeliveryDate('');
                }}
                data={{
                    customerName,
                    clientNumber,
                    items: orderItems,
                    pickupCharge: Number(pickupCharge) || 0,
                    deliveryCharge: Number(deliveryCharge) || 0,
                    pickupType,
                    deliveryType,
                    totalAmount,
                    deliveryDate
                }}
            />
        </div>
    );
};

export default Orders;

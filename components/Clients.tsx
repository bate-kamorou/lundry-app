import React, { useEffect, useState } from 'react';
import { CUSTOMERS, PRODUCTS } from '../data';
import { OrderItem } from '../types';

interface SavedOrder {
    id: string;
    date: string;
    customerName: string;
    clientNumber: string;
    service: string;
    totalAmount: number;
    deliveryDate: string;
    status: string;
    items: OrderItem[];
    pickupType?: string;
    deliveryType?: string;
}

const Clients: React.FC<{ onNavigate: (view: any) => void }> = ({ onNavigate }) => {
    const [orders, setOrders] = useState<SavedOrder[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        try {
            const savedOrders = JSON.parse(localStorage.getItem('laundry_orders') || '[]');
            if (Array.isArray(savedOrders)) {
                // Strict sanitization: Ensure every order has all required fields with safe defaults
                const validOrders = savedOrders.map((o: any) => ({
                    id: o.id || Date.now().toString() + Math.random().toString(),
                    date: o.date || new Date().toISOString(),
                    customerName: o.customerName || 'Client Inconnu',
                    clientNumber: o.clientNumber || '-',
                    service: o.service || 'Service Inconnu',
                    totalAmount: typeof o.totalAmount === 'number' ? o.totalAmount : 0,
                    deliveryDate: o.deliveryDate || '',
                    status: o.status || 'En cours',
                    items: Array.isArray(o.items) ? o.items : [],
                    pickupType: o.pickupType || 'Non spécifié',
                    deliveryType: o.deliveryType || 'Non spécifié'
                }));
                setOrders(validOrders.sort((a: SavedOrder, b: SavedOrder) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error("Failed to load orders:", error);
            setOrders([]);
        }
    }, []);

    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const deleteOrder = (orderId: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ? Cette action est irréversible.")) {
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
            localStorage.setItem('laundry_orders', JSON.stringify(updatedOrders));
            if (expandedOrderId === orderId) {
                setExpandedOrderId(null);
            }
        }
    };

    const toggleStatus = (orderId: string) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                const newStatus = order.status === 'Prêt / livré' ? 'En cours' : 'Prêt / livré';
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updatedOrders);
        localStorage.setItem('laundry_orders', JSON.stringify(updatedOrders));
    };

    const toggleExpand = (orderId: string) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null);
        } else {
            setExpandedOrderId(orderId);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        try {
            return new Date(dateString).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (e) {
            return '-';
        }
    };

    const formatCurrency = (amount: number | undefined | null) => {
        if (typeof amount !== 'number' || isNaN(amount)) return '0';
        return amount.toFixed(0);
    };

    const filteredOrders = orders.filter(order =>
        (order.customerName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-800">Suivi Clientèle</h2>
                <div className="flex flex-1 md:justify-end items-center space-x-4">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Rechercher un client..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500 focus:border-transparent outline-none"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm whitespace-nowrap">
                        Exporter
                    </button>
                    <button
                        onClick={() => onNavigate('orders')}
                        className="px-4 py-2 bg-brand-green-600 text-white rounded-lg hover:bg-brand-green-700 font-medium text-sm shadow-sm whitespace-nowrap"
                    >
                        Nouveau Client
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="">
                    <table className="w-full divide-y divide-slate-200 table-fixed">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider w-24">Date</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider w-32">N° Client</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider w-24">Prévu le</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider w-24">Montant</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider w-28">Statut</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider w-16">Prêt</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                                        {searchTerm ? 'Aucun client trouvé pour cette recherche.' : 'Aucune commande enregistrée pour le moment.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <tr className={`hover:bg-slate-50 transition-colors cursor-pointer ${expandedOrderId === order.id ? 'bg-slate-50' : ''}`} onClick={() => toggleExpand(order.id)}>
                                            <td className="px-4 py-4 text-sm text-slate-600 text-center">
                                                {formatDate(order.date)}
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="text-sm font-bold text-slate-800 truncate">{order.customerName}</div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600 text-center whitespace-nowrap">
                                                {order.clientNumber || '-'}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600 text-center">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium inline-block truncate max-w-full">
                                                    {order.service}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-slate-800 text-center">
                                                {formatDate(order.deliveryDate)}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-bold text-slate-800 text-center">
                                                {formatCurrency(order.totalAmount)}
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${order.status === 'Prêt / livré' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="checkbox"
                                                    checked={order.status === 'Prêt / livré'}
                                                    onChange={() => toggleStatus(order.id)}
                                                    className="w-5 h-5 text-brand-green-600 rounded focus:ring-brand-green-500 border-gray-300 cursor-pointer"
                                                />
                                            </td>
                                        </tr>
                                        {expandedOrderId === order.id && (
                                            <tr className="bg-slate-50">
                                                <td colSpan={8} className="px-6 py-4">
                                                    <div className="bg-white rounded-lg border border-slate-200 p-4">

                                                        <table className="min-w-full divide-y divide-slate-100 mb-4">
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-left text-xs font-medium text-slate-500 uppercase pb-2">Article</th>
                                                                    <th className="text-right text-xs font-medium text-slate-500 uppercase pb-2">Quantité</th>
                                                                    <th className="text-right text-xs font-medium text-slate-500 uppercase pb-2">Prix Unitaire</th>
                                                                    <th className="text-right text-xs font-medium text-slate-500 uppercase pb-2">Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-slate-100">
                                                                {order.items?.map((item, idx) => {
                                                                    const product = PRODUCTS.find(p => p.id === item.productId);
                                                                    return (
                                                                        <tr key={idx}>
                                                                            <td className="py-2 text-sm text-slate-700">{product?.name || 'Article Inconnu'}</td>
                                                                            <td className="py-2 text-sm text-slate-600 text-right">{item.quantity}</td>
                                                                            <td className="py-2 text-sm text-slate-600 text-right">{formatCurrency(item.unitPrice || 0)}</td>
                                                                            <td className="py-2 text-sm font-medium text-slate-800 text-right">{formatCurrency((item.unitPrice || 0) * (item.quantity || 0))}</td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                        <div className="flex  items-start mb-4">
                                                            {/* <h4 className="text-sm font-bold text-slate-700">Détails de la commande</h4> */}
                                                            <div className="text-sm text-green-600 text-center bg-green-50 p-2 rounded">
                                                                <p><span className="font-semibold">Collecte: </span> {order.pickupType}</p>
                                                                <p><span className="font-semibold">Livraison: </span> {order.deliveryType}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <button
                                                                onClick={() => deleteOrder(order.id)}
                                                                className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                                Supprimer la commande
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Clients;

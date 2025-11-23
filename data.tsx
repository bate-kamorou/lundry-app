import type { Product, Customer } from './types';

export const CUSTOMERS: Customer[] = [
    { id: '1', name: 'Austin Bailey' },
    { id: '2', name: 'Marie Dubois' },
    { id: '3', name: 'Jean Martin' },
    { id: '4', name: 'Sophie Bernard' },
];

export const PRODUCTS: Product[] = [
    { id: '1', name: 'T-shirt', price: 500 },
    { id: '2', name: 'chemise', price: 500 },
    { id: '3', name: 'Robe/Toge', price: 1000 },
    { id: '4', name: 'Costume complet', price: 1500 },
    { id: '5', name: 'Jupe', price: 500 },
    { id: '6', name: 'Short', price: 400 },
    { id: '7', name: 'Jean', price: 500 },
    { id: '8', name: 'Vest', price: 1000 },
    { id: '9', name: 'Complet pagne', price: 1000 },
    { id: '10', name: 'Complet bassin', price: 1000 },
    { id: '11', name: 'complet short', price: 800 },
    { id: '12', name: 'Couvertures 2 place', price: 1000 },
    { id: '13', name: 'Couette', price: 4000 },
    { id: '14', name: 'Couverture 3 place', price: 1500 },
    { id: '15', name: 'Blazer', price: 500 },
];

export const SERVICES: string[] = ['Lavage et Repassage', 'Repassage seul', 'Abonnement', 'Nettoyage à sec',];

export const COLLECT_TYPES: string[] = ['Dépôt en magasin', 'Collecte à domicile'];
export const DELIVERY_TYPES: string[] = ['Retrait au magasin', 'Livraison à domicile'];

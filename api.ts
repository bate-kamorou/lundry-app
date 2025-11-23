import { SavedOrder } from './types';

const API_URL = '/.netlify/functions/orders';

export const api = {
    async getOrders(): Promise<SavedOrder[]> {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch orders');
        return response.json();
    },

    async createOrder(order: SavedOrder): Promise<void> {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        });
        if (!response.ok) throw new Error('Failed to create order');
    },

    async updateOrderStatus(id: string, status: string): Promise<void> {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status })
        });
        if (!response.ok) throw new Error('Failed to update order status');
    },

    async deleteOrder(id: string): Promise<void> {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete order');
    }
};

import { Handler } from '@netlify/functions';
import pool from './db';

export const handler: Handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        if (event.httpMethod === 'GET') {
            const client = await pool.connect();
            try {
                const result = await client.query(`
                    SELECT 
                        o.*,
                        json_agg(
                            json_build_object(
                                'productId', oi.product_id,
                                'quantity', oi.quantity,
                                'unitPrice', oi.unit_price
                            )
                        ) as items
                    FROM orders o
                    LEFT JOIN order_items oi ON o.id = oi.order_id
                    GROUP BY o.id
                    ORDER BY o.date DESC
                `);

                // Map DB fields to frontend interface
                const orders = result.rows.map(row => ({
                    id: row.id,
                    date: row.date,
                    customerName: row.customer_name,
                    clientNumber: row.client_number,
                    service: row.service,
                    totalAmount: parseFloat(row.total_amount),
                    deliveryDate: row.delivery_date,
                    status: row.status,
                    pickupCharge: parseFloat(row.pickup_charge),
                    deliveryCharge: parseFloat(row.delivery_charge),
                    pickupType: row.pickup_type,
                    deliveryType: row.delivery_type,
                    items: row.items[0]?.productId ? row.items : [] // Handle case where no items exist
                }));

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(orders)
                };
            } finally {
                client.release();
            }
        }

        if (event.httpMethod === 'POST') {
            const data = JSON.parse(event.body || '{}');
            const client = await pool.connect();

            try {
                await client.query('BEGIN');

                const {
                    id, date, customerName, clientNumber, service,
                    totalAmount, deliveryDate, status,
                    pickupCharge, deliveryCharge, pickupType, deliveryType, items
                } = data;

                await client.query(`
                    INSERT INTO orders (
                        id, date, customer_name, client_number, service, 
                        total_amount, delivery_date, status, 
                        pickup_charge, delivery_charge, pickup_type, delivery_type
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                `, [
                    id, date, customerName, clientNumber, service,
                    totalAmount, deliveryDate === '' ? null : deliveryDate, status,
                    pickupCharge, deliveryCharge, pickupType, deliveryType
                ]);

                for (const item of items) {
                    await client.query(`
                        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                        VALUES ($1, $2, $3, $4)
                    `, [id, item.productId, item.quantity, item.unitPrice]);
                }

                await client.query('COMMIT');

                return {
                    statusCode: 201,
                    headers,
                    body: JSON.stringify({ message: 'Order created' })
                };
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        }
    }

        if (event.httpMethod === 'PUT') {
        const data = JSON.parse(event.body || '{}');
        const { id, status } = data;

        const client = await pool.connect();
        try {
            await client.query('UPDATE orders SET status = $1 WHERE id = $2', [status, id]);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'Order updated' })
            };
        } finally {
            client.release();
        }
    }

    if (event.httpMethod === 'DELETE') {
        const { id } = event.queryStringParameters || {};
        if (!id) return { statusCode: 400, headers, body: 'Missing ID' };

        const client = await pool.connect();
        try {
            await client.query('DELETE FROM orders WHERE id = $1', [id]);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'Order deleted' })
            };
        } finally {
            client.release();
        }
    }

    return { statusCode: 405, headers, body: 'Method Not Allowed' };

} catch (error: any) {
    console.error('API Error:', error);
    return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message })
    };
}
};

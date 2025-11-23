
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CHART_COLORS } from '../constants';
import KPICard from './KPI_Card';
import ChartCard from './ChartCard';
import { SavedOrder } from '../types';
import { api } from '../api';

const TruckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5a3.375 3.375 0 00-3.375-3.375H3.375m15.75 9V14.25-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H3.375m15.75 9v-1.875" /></svg>
);
const EnvelopeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
);
const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
);
const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.144-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.057-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
);


const Dashboard: React.FC = () => {
    const [orders, setOrders] = useState<SavedOrder[]>([]);
    const [stats, setStats] = useState({
        deliveryToday: 0,
        newOrders: 0,
        pickupRequests: 0,
        expiringToday: 0,
        revenueByService: [] as any[],
        ordersByStatus: [] as any[],
        monthlyRevenue: [] as any[]
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedOrders = await api.getOrders();
                setOrders(savedOrders);
                calculateStats(savedOrders);
            } catch (error) {
                console.error("Failed to load orders for dashboard", error);
            }
        };
        loadData();
    }, []);

    const calculateStats = (data: SavedOrder[]) => {
        const today = new Date().toISOString().split('T')[0];

        // KPIs
        const deliveryToday = data.filter(o => o.deliveryType === 'Livraison à domicile' && o.deliveryDate === today).length;
        const newOrders = data.filter(o => o.status === 'En cours').length;
        const pickupRequests = data.filter(o => o.pickupType === 'Ramassage à domicile').length;
        const expiringToday = data.filter(o => o.deliveryDate === today && o.status !== 'Prêt / livré').length;

        // Charts Data

        // Services Breakdown
        const servicesCount: Record<string, number> = {};
        data.forEach(o => {
            servicesCount[o.service] = (servicesCount[o.service] || 0) + 1;
        });
        const revenueByService = Object.keys(servicesCount).map(service => ({
            name: service,
            'Commandes': servicesCount[service]
        }));

        // Orders by Status (Pie Chart)
        const statusCount: Record<string, number> = {};
        data.forEach(o => {
            statusCount[o.status] = (statusCount[o.status] || 0) + 1;
        });
        const ordersByStatus = Object.keys(statusCount).map(status => ({
            name: status,
            value: statusCount[status]
        }));

        // Monthly Revenue
        const revenueByMonth: Record<string, number> = {};
        data.forEach(o => {
            const date = new Date(o.date);
            const month = date.toLocaleString('default', { month: 'short' });
            revenueByMonth[month] = (revenueByMonth[month] || 0) + o.totalAmount;
        });
        const monthlyRevenue = Object.keys(revenueByMonth).map(month => ({
            name: month,
            'Revenu': revenueByMonth[month]
        }));

        setStats({
            deliveryToday,
            newOrders,
            pickupRequests,
            expiringToday,
            revenueByService,
            ordersByStatus,
            monthlyRevenue
        });
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Livraison à domicile aujourd'hui" value={stats.deliveryToday.toString()} icon={TruckIcon} color="green" />
                <KPICard title="Commandes En Cours" value={stats.newOrders.toString()} icon={EnvelopeIcon} color="blue" />
                <KPICard title="Demandes de collecte" value={stats.pickupRequests.toString()} icon={LinkIcon} color="orange" />
                <KPICard title="A Livrer Aujourd'hui" value={stats.expiringToday.toString()} icon={TrashIcon} color="red" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard title="Commandes par Service" className="lg:col-span-2">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.revenueByService} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Commandes" fill="#16a34a" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Statut des Commandes">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={stats.ordersByStatus} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" >
                                {stats.ordersByStatus.map((entry, index) => <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                <ChartCard title="Revenu Mensuel">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.monthlyRevenue} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Revenu" fill="#fb923c" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
};

export default Dashboard;

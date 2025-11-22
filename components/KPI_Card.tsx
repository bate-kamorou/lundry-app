
import React from 'react';

interface KPICardProps {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: 'green' | 'blue' | 'orange' | 'red';
}

const colorClasses = {
    green: { bg: 'bg-green-100', iconBg: 'bg-green-200', text: 'text-green-800' },
    blue: { bg: 'bg-blue-100', iconBg: 'bg-blue-200', text: 'text-blue-800' },
    orange: { bg: 'bg-orange-100', iconBg: 'bg-orange-200', text: 'text-orange-800' },
    red: { bg: 'bg-red-100', iconBg: 'bg-red-200', text: 'text-red-800' },
};

const KPICard: React.FC<KPICardProps> = ({ title, value, icon: Icon, color }) => {
    const classes = colorClasses[color];

    return (
        <div className={`glass-panel p-6 rounded-2xl flex items-center card-hover border-l-4 ${classes.bg.replace('bg-', 'border-')}`}>
            <div className={`p-4 rounded-xl ${classes.iconBg} mr-5 shadow-sm`}>
                <Icon className={`w-8 h-8 ${classes.text}`} />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
            </div>
        </div>
    );
};

export default KPICard;

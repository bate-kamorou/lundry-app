
import React from 'react';

interface ChartCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`glass-panel p-6 rounded-2xl ${className}`}>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <span className="w-1 h-6 bg-brand-green-500 rounded-full mr-3"></span>
                {title}
            </h3>
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default ChartCard;

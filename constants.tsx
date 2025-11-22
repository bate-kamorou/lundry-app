
import type { Product, Customer } from './types';

// Data moved to data.tsx

// Chart Data
export const servicesAndSubscribersData = [
  { name: 'Nettoyage à sec', 'Abonnement': 2 },
  { name: 'Couettes', 'Abonnement': 4 },
  { name: 'Repassage', 'Abonnement': 1 },
  { name: 'Lavage', 'Abonnement': 3 },
  { name: 'Lavage et Repassage', 'Abonnement': 1 },
];

export const monthlyOrdersData = [
  { name: 'Nettoyage à sec', value: 400 },
  { name: 'Lavage', value: 300 },
  { name: 'Repassage', value: 300 },
  { name: 'Couettes', value: 200 },
  { name: 'Abonnements', value: 278 },
];

export const yearlyOrdersData = [
  { name: 'Nettoyage à sec', value: 2400 },
  { name: 'Lavage', value: 4567 },
  { name: 'Repassage', value: 1398 },
  { name: 'Couettes', value: 9800 },
  { name: 'Abonnements', value: 3908 },
];

export const monthlyPackageIncomeData = [
  { name: 'Sem 1', 'Montant Total': 150 },
  { name: 'Sem 2', 'Montant Total': 120 },
  { name: 'Sem 3', 'Montant Total': 180 },
  { name: 'Sem 4', 'Montant Total': 160 },
];

export const monthlyOrdinaryIncomeData = [
  { name: 'Sem 1', 'Montant Total': 80 },
  { name: 'Sem 2', 'Montant Total': 60 },
  { name: 'Sem 3', 'Montant Total': 90 },
  { name: 'Sem 4', 'Montant Total': 85 },
];

export const CHART_COLORS = ['#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d'];

import { type ReactNode } from 'react';
import './DashboardCard.css';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
}

export const DashboardCard = ({ title, children }: DashboardCardProps) => {
  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">{title}</h2>
      <div className="dashboard-card-content">
        {children}
      </div>
    </div>
  )
}
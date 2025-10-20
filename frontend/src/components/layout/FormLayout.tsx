import { type ReactNode } from 'react';
import './FormLayout.css';

interface FormLayoutProps {
  title: string;
  children: ReactNode;
}

export const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <div className="form-layout-container">
      <div className="form-layout-card">
        <h1 className="form-layout-logo">Lúmen</h1>
        <h2 className="form-layout-title">{title}</h2>
        {children}
      </div>
    </div>
  );
};
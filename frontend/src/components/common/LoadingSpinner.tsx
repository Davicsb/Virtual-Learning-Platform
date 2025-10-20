import './LoadingSpinner.css';

export const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p>Carregando...</p>
    </div>
  );
};
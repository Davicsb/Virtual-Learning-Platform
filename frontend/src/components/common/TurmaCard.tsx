import type { TurmaSummary } from '../../types/turma.types';
import { Link } from 'react-router-dom';
import './TurmaCard.css';

interface TurmaCardProps {
  turma: TurmaSummary;
}

export const TurmaCard = ({ turma }: TurmaCardProps) => {
  return (
    // O Link 'to' nos levará para a página de detalhes da turma
    <Link to={`/app/turma/${turma.id.toString()}`} className="turma-card-link">
      <div className="turma-card">
        {/* Um "header" visual. No futuro, pode ter uma imagem. */}
        <div className="turma-card-header"></div>
        <div className="turma-card-content">
          {/* Nome do Curso (ex: "Engenharia de Software") */}
          <span className="turma-card-course">{turma.courseTitle}</span>
          {/* Nome da Turma (ex: "Desenvolvimento Web 2025/2") */}
          <h3 className="turma-card-title">{turma.name}</h3>
          {/* Nome do Professor */}
          <p className="turma-card-prof">Prof. {turma.professorName}</p>
        </div>
      </div>
    </Link>
  );
};
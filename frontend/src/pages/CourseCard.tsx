import type { Curso } from '../types/models';
import { Button } from '../components/common/Button';
import './CourseCard.css';

interface CourseCardProps {
  curso: Curso;
}

export const CourseCard = ({ curso }: CourseCardProps) => {
  return (
    <div className="course-card">
      <div className="course-card-content">
        <h3>{curso.title}</h3>
        <p>{curso.content}</p>
      </div>
      {/* "Ver mais" leva para uma futura página de detalhes */}
      <Button variant="secondary" style={{ width: '100%' }}>
        Ver mais
      </Button>
    </div>
  );
};
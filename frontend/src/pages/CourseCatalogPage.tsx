import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { CourseCard } from '../components/common/CourseCard';
import { getAllCursos } from '../services/Curso_Service'; 
import type { Curso } from '../types/models';
import './CourseCatalogPage.css';

export const CourseCatalogPage = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Busca os dados assim que a página carrega
  useEffect(() => {
    getAllCursos()
      .then(data => {
        setCursos(data);
      })
      .catch(err => {
        console.error("Falha ao buscar cursos", err);
        // Aqui você poderia setar um estado de erro
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // O array vazio [] significa que isso roda só 1 vez

  return (
    <div className="catalog-container">
      <Header />

      {/* Hero da Página de Catálogo */}
      <main className="catalog-hero">
        <h1>Catálogo de Cursos</h1>
        <p>Encontre a trilha de aprendizado perfeita para o seu futuro.</p>
      </main>

      {/* Seção do Grid de Cursos */}
      <section className="catalog-grid-section">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="catalog-grid">
            {cursos.map(curso => (
              <CourseCard key={curso.id} curso={curso} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
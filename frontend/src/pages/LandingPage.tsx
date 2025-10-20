import { Button } from '../components/common/Button';
import { Logo } from '../components/common/Logo';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export const LandingPage = () => {
  return (
    <div className="new-landing-container">
    
      <header className="new-landing-header">
        <Logo size="small" />
        
    
      </header>

      {/* 2. O Conteúdo Principal (Hero Section) */}
      <main className="new-landing-hero">
        {/* Coluna da Esquerda (Textos) */}
        <div className="new-landing-left">
          <h1 className="new-landing-headline">
            ILUMINE
            <span className="headline-highlight">SEU FUTURO</span>
          </h1>
          <p className="new-landing-description">
            O Lúmen é a sua nova plataforma de aprendizado virtual.
            Explore cursos, complete atividades e trilhe seu caminho para o conhecimento.
          </p>

          {/* BOTÕES DE CTA */}
          <div className="new-landing-ctas">
            <Link to="/registrar">
              <Button variant="primary">Comece a Aprender</Button>
            </Link>
            <span className="cta-divider">ou</span>
            <Link to="/login" className="cta-link">
              Faça login
            </Link>
          </div>
        </div>

        {/* Coluna da Direita (Bloco Gráfico) */}
        <div className="new-landing-right">
          <div className="graphic-block">
            {/* O conteúdo (foto) é controlado pelo CSS */}
          </div>
        </div>
      </main>

      {/* 3. A SEÇÃO "CONHEÇA NOSSOS CURSOS" */}
      <section className="courses-promo-section">
        <h2 className="courses-promo-headline">
          Conheça Nossos Cursos
        </h2>
        <p className="courses-promo-description">
          Temos dezenas de cursos nas áreas de tecnologia, design e negócios,
          ministrados pelos melhores profissionais do mercado.
        </p>
        <Link to="/cursos">
          {/* Botão padrão (sem a classe 'btn-inverted') */}
          <Button variant="primary">
            Ver Catálogo de Cursos
          </Button>
        </Link>
      </section>

      {/* 4. A SEÇÃO DE DEPOIMENTOS */}
      <section className="testimonials-section">
        <h2 className="testimonials-headline">O Que Nossos Usuários Dizem</h2>
        <div className="testimonials-grid">
          {/* Card 1 - Aluno */}
          <div className="testimonial-card">
            <div className="testimonial-author">
              <div className="author-avatar" data-initial="M"></div>
              <div className="author-info">
                <span className="author-name">Mariana S.</span>
                <span className="author-role">Aluna de Design</span>
              </div>
            </div>
            <p className="testimonial-quote">
              "A plataforma Lúmen mudou minha forma de estudar. Os cursos
              são diretos ao ponto e a interface é muito intuitiva.
              Consegui meu primeiro estágio em 3 meses!"
            </p>
          </div>

          {/* Card 2 - Professor */}
          <div className="testimonial-card">
            <div className="testimonial-author">
              <div className="author-avatar" data-initial="L"></div>
              <div className="author-info">
                <span className="author-name">Prof. Lucas M.</span>
                <span className="author-role">Professor de T.I.</span>
              </div>
            </div>
            <p className="testimonial-quote">
              "Como professor, a Lúmen me dá as ferramentas que preciso
              para criar conteúdo de impacto. O engajamento dos alunos é
              notavelmente maior aqui. Recomendo."
            </p>
          </div>

          {/* Card 3 - Aluno */}
          <div className="testimonial-card">
            <div className="testimonial-author">
              <div className="author-avatar" data-initial="J"></div>
              <div className="author-info">
                <span className="author-name">João P.</span>
                <span className="author-role">Aluno de Engenharia</span>
              </div>
            </div>
            <p className="testimonial-quote">
              "Eu estava com muita dificuldade em Banco de Dados, mas o
              curso do Lúmen foi um divisor de águas. A didática é
              excelente e pude tirar dúvidas!"
            </p>
          </div>
        </div>
      </section>

      {/* Elementos Decorativos */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
    </div>
  );
};
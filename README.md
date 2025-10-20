# Virtual-Learning-Platform
Projeto de um ambiente virtual escolar baseado no sistema SIGAA, AVA e Google Classroom para a máteria de engenharia de software.

# Rodando o Front-end (React)

Para rodar o ambiente de desenvolvimento front-end, siga os passos abaixo.

**Pré-requisitos:**
* [Node.js](https://nodejs.org/) (Versão LTS recomendada)
* [Git](https://git-scm.com/)

---

### Guia de Instalação

1.  Clone o repositório (se ainda não o fez):
    ```bash
    git clone https://[URL_DO_SEU_REPOSITORIO_GIT]
    cd Virtual-Learning-Platform
    ```

2.  Navegue até a pasta do front-end:
    ```bash
    cd frontend
    ```

3.  Instale todas as dependências do projeto (React, Vite, etc.):
    ```bash
    npm install
    ```

4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

5.  Abra seu navegador e acesse [http://localhost:5173/](http://localhost:5173/) para ver o projeto rodando.

---

## História de usuários

### 1. Como usuário eu quero:  
* Ser capaz de me cadastrar e logar no sistema.  
* Ser capaz de editar minhas informações de usuário.  
* Ver a página de uma turma especifica com informações dela como descrição, programação, notas, alunos participantes, professor e etc.  
* Ver materiais como aulas em vídeo e documentos na página da turma especifica.  
* Ver as atividades da turma em sua página especifica.  
* Ver as informações de uma atividade em especifico.  

### 2. Como admin ou professor eu quero:  
* Ser capaz de adicionar um material (vídeos, documentos, etc) em um turma.
* Ser capaz de adicionar uma atividade em uma turma.
* Ser capaz de remover um aluno da turma.
* Ser capaz de avaliar/dar uma nota para atividades de alunos entregues.

### 3. Como professor ou aluno eu quero:  
* Ver uma listagem de turmas que eu estou participando.
  
### 4. Como admin eu quero:  
* Ser capaz de cadastrar usuários no sistema.
* Ver uma listagem de cursos e turmas.
* Ser capaz de gerenciar um curso ou uma turma.
* Ser capaz de adicionar um curso ou uma turma.
* Ser capaz de adicionar um professor ou aluno em uma turma.
  
### 5. Como professor eu quero:  
* Ser capaz de dar avisos em uma turma.

### 6. Como aluno eu quero:
* Ver uma listagem de atividades pendentes de todas as turmas.
* Ser capaz de entregar uma atividade.
* Ser capaz de enviar/editar/ver um arquivo de uma atividade.

## Requisitos

Até agora só tem requisitos funcionais.

**RF001** - O usuário deve ser capaz de logar e se cadastrar no sistema. - Alta  
**RF002** - O usuário deve ser capaz de alterar suas informações cadastradas. - Alta  
**RF003** - O usuário deve ser capaz de ver a página de uma turma especifica com as informações dela. - Alta  
**RF004** - O usuário deve ser capaz de ver materiais de uma turma. - Média*  
**RF005** - O usuário deve ser capaz de ver uma página de atividades de uma turma. - Alta  
**RF006** - O usuário deve ser capaz de ver as informações de uma atividade. - Alta  

**RF007** - O admin deve poder cadastrar usuários no sistema. - Alta  
**RF008** - O admin deve poder ver uma listagem de cursos e turmas cadastrados no sistema. - Alta  
**RF009** - O admin deve poder cadastrar e gerenciar um curso ou turma. - Alta  
**RF010** - O admin deve poder adicionar um aluno ou professor em uma turma. - Alta  

**RF011** - O admin ou professor deve poder dar avisos em uma turma. - Média  
**RF012** - O admin ou professor deve poder adicionar um material ou atividade na turma. - Alta  
**RF013** - O admin ou professor deve poder avaliar ou dar uma nota para atividades de alunos entregues. - Alta  
**RF014** - O admin ou professor deve poder remover um aluno da turma. - Média  

**RF015** - O professor deve poder dar avisos em uma turma. - Baixa  

**RF016** - O professor ou aluno deve poder ver uma listagem de turmas que estão participando. - Alta  

**RF017** - O aluno deve poder ver uma listagem de atividades pendentes/não entregues de todas as turmas. - Média  
**RF018** - O aluno deve poder entregar uma atividade. - Alta  
**RF019** - O aluno deve poder enviar/editar/ver um arquivo de uma atividade. - Alta  

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
    git clone https://github.com/Davicsb/Virtual-Learning-Platform
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

# Rodando o Back-End (Java & MySql)

**Pré-requisitos:**
* [IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download/?section=windows)
* [MySql (Community Server & Workbench)](https://dev.mysql.com/downloads/)
* [Postman](https://www.postman.com/downloads/)

---

### Guia de instalação

1.  Abra o MySQL Workbench e execute o seguinte código no terminal:
    ```bash
    create database AVA
    ```
    Em seguida, execute:
    ```bash
    create database Auth
    ```
    Sua base de dados para o AVA e o AuthService foi criada.

2.  Abra a pasta do repositório no IntelliJ.  

3.  Nas configurações, clique na seção plugins e instale o plugin "LomboK" no marketplace.

4.  Nos arquivos application.properties de cada serviço (Auth e Data[que no caso é a pasta do backend/AVA]) troque a senha e usuário para a do seu mySQL (A rota de localhost usa a default do MYSQL [3306]).

5.  Rode os arquivos AvaApplication.java, AuthServiceApplication.java e ApiGatewayApplication.java simultaneamente no IntelliJ.

6.  Utilize o programa Postman para dar GET, POST, PUT e/ou DELETE em dados (colocados na aba "Body" em formato JSON) para a database AVA.

7.  As rotas no momento são:  
    ```string
    localhost:8080/data/professor -> POST: Cadastra um usuário PROFESSOR na base, GET: Lista todos os professores na base.  
    localhost:8080/data/professor/id -> PUT: Atualiza os dados do professor com o id, GET: Lista os dados do professor do id, DELETE: deleta o professor da base.
    localhost:8080/data/professor/grade -> PUT: Dá/Atualiza a nota de um aluno em uma atividade, usando o id de ambos e a nota, se o token JWT de uma conta PROFESSOR for válido (coloque o token em Authorization -> Type/Bearer Token).
      
    localhost:8080/data/curso -> POST: Cadastra um curso na base, GET: Lista todos os cursos na base.
    localhost:8080/data/curso/id -> PUT: Atualiza os dados do curso do id, GET: Lista os dados do curso do id, DELETE: deleta o curso da base  
      
    localhost:8080/data/turma -> POST, GET
    localhost:8080/data/turma/id -> PUT, GET, DELETE

    localhost:8080/data/atividades -> POST, GET
    localhost:8080/data/atividades/id -> PUT, GET, DELETE


    localhost:8080/auth/register -> POST: Cadastra um usuário ALUNO na base
    localhost:8080/auth/login -> POST: Faz uma tentativa de login, se der sucesso retorna uma string de um token JWT

    //Debug
    localhost:8080/auth/public -> GET: Retorna "rota pública", feita para testar a camada de visibilidade
    localhost:8080/auth/private -> GET: Retorna "rota privada" se o token JWT de uma conta PROFESSOR for válido (coloque o token em Authorization -> Type/Bearer Token)

    ```

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

**RF001** - O usuário deve ser capaz de logar e se cadastrar no sistema. - Alta -> Tecnicamente já feito  
**RF002** - O usuário deve ser capaz de alterar suas informações cadastradas. - Alta -> Tecnicamente já feito  
**RF003** - O usuário deve ser capaz de ver a página de uma turma especifica com as informações dela. - Alta  -> Tecnicamente já feito  
**RF004** - O usuário deve ser capaz de ver materiais de uma turma. - Média*  
**RF005** - O usuário deve ser capaz de ver uma página de atividades de uma turma. - Alta  
**RF006** - O usuário deve ser capaz de ver as informações de uma atividade. - Alta  -> Tecnicamente já feito  

**RF007** - O admin deve poder cadastrar usuários no sistema. - Alta  
**RF008** - O admin deve poder ver uma listagem de cursos e turmas cadastrados no sistema. - Alta  
**RF009** - O admin deve poder cadastrar e gerenciar um curso ou turma. - Alta  
**RF010** - O admin deve poder adicionar um aluno ou professor em uma turma. - Alta  
 
**RF012** - O professor deve poder adicionar um material ou atividade na turma. - Alta -> A parte da atividade foi tecnicamente já feita  
**RF013** - O professor deve poder avaliar ou dar uma nota para atividades de alunos entregues. - Alta -> Tecnicamente já feito  
**RF014** - O professor deve poder remover um aluno da turma. - Média
**RF015** - O professor deve poder dar avisos em uma turma. - Baixa  

**RF016** - O professor ou aluno deve poder ver uma listagem de turmas que estão participando. - Alta  

**RF017** - O aluno deve poder ver uma listagem de atividades pendentes/não entregues de todas as turmas. - Média  
**RF018** - O aluno deve poder entregar uma atividade. - Alta  
**RF019** - O aluno deve poder enviar/editar/ver um arquivo de uma atividade. - Alta  


## Microserviços

Microserviços para o funcionamento do sistema AVA.

`AuthService`         - Lida com a autenticação e cadastro de usuários.  
`DataService`         - Lida com o gerenciamento de dados dos usuários e materiais do sistema.   


## O que falta

1.  Integração com o front
2.  Mais um serviço talvez
3.  A camada do admin - Só vai ter um admin no sistema e ele vai ter uma camada acima de visão de uma página
4.  Implementação de materiais
5.  Possibilidade de entrega de atividade pelo aluno.
6.  Verificação de autenticação nas páginas que não são a /register, /login e /landing page eu acho
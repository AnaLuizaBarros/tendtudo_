# Projeto E-commerce Frontend com Angular (TENDTUDO)

Este é um projeto de frontend para uma aplicação de e-commerce, desenvolvido com as versões mais recentes do Angular (18+). A aplicação simula as funcionalidades essenciais de uma loja virtual, utilizando a API pública [dummyjson.com](https://dummyjson.com/) como backend. O foco principal foi a criação de uma arquitetura robusta, escalável e de fácil manutenção, seguindo as melhores práticas do mercado.

## ✨ Principais Funcionalidades

-   **Autenticação de Usuários:** Sistema completo de Login e Cadastro utilizando `Reactive Forms`.
-   **Gerenciamento de Sessão:** O token JWT retornado pela API é salvo no `localStorage` para manter o usuário logado.
-   **Rotas Protegidas:** Uso de `Route Guards` para proteger rotas e gerenciar o acesso:
    -   **AuthGuard:** Impede que usuários não autenticados acessem páginas internas.
    -   **LoginGuard:** Impede que usuários já autenticados acessem a página de login novamente, redirecionando-os para a página principal.
-   **Interceptor HTTP Global:** Um `HttpInterceptor` centraliza a lógica de:
    -   Adicionar o token de autenticação em todas as requisições para a API.
    -   Tratar erros de API de forma global, exibindo toasts para o usuário.
-   **Listagem e Busca de Produtos:**
    -   Páginas de categoria que listam produtos dinamicamente.
    -   Funcionalidade de busca no header que exibe os resultados agrupados por categoria.
-   **Componentização Avançada:**
    -   Criação de componentes de UI reutilizáveis, como Toasts de notificação, Spinners de carregamento e Validadores de formulário.
    -   Uso de uma classe base (`FormComponent`) para compartilhar lógica entre os formulários de Login e Cadastro.
-   **Estilização com SCSS:** Arquitetura de estilos modular e organizada, separando variáveis, componentes e layouts.
-   **Acessibilidade (WCAG):** O HTML foi estruturado com tags semânticas e atributos ARIA para garantir uma melhor experiência para usuários de leitores de tela.
-   **Máscaras de Formulário:** Uso da biblioteca `ngx-mask` para formatar campos como CEP e Telefone.

## 🚀 Tecnologias Utilizadas

-   **Angular 18+** 
-   **TypeScript**
-   **RxJS** (com operadores como `switchMap` e `takeUntil`)
-   **SCSS** para estilização
-   **Angular CLI**
-   **Bootstrap Icons**
-   **ngx-mask**

## ⚙️ Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto na sua máquina.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [Angular CLI](https://angular.io/cli) instalado globalmente:
    ```bash
    npm install -g @angular/cli
    ```

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/AnaLuizaBarros/tendtudo_VOX.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd TENDTUDO_VOX
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    ng serve -o
    ```
    O comando `-o` abrirá automaticamente a aplicação no seu navegador padrão. A aplicação estará disponível em `http://localhost:4200/`.


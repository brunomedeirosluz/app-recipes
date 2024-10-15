# Sistema de Receitas e Drinks

Este projeto foi desenvolvido como parte do curso da Trybe e em colaboração com outros membros do grupo. Utilizamos o Trello como ferramenta Kanban para gerenciar as tarefas.

## Descrição

O sistema permite visualizar, buscar, filtrar, favoritar, compartilhar e acompanhar o processo de preparação de receitas e drinks. Utilizamos duas APIs distintas:

- TheMealDB API para receitas de comidas.
- TheCocktailDB API para receitas de bebidas.

## Funcionalidades

- Tela de login (/)
- Tela principal de receitas de comidas (/meals)
- Tela principal de receitas de bebidas (/drinks)
- Tela de detalhes de uma receita de comida (/meals/:id-da-receita)
- Tela de detalhes de uma receita de bebida (/drinks/:id-da-receita)
- Tela de receita em progresso de comida (/meals/:id-da-receita/in-progress)
- Tela de receita em progresso de bebida (/drinks/:id-da-receita/in-progress)
- Tela de perfil (/profile)
- Tela de receitas feitas (/done-recipes)
- Tela de receitas favoritas (/favorite-recipes)

## Responsividade

O projeto foi desenvolvido para ser 100% responsivo, adaptando-se a diferentes tamanhos de tela.

### Visualização Mobile:
![Versão Mobile](https://github.com/brunomedeirosluz/app-recipes/blob/2c3e9918c6bf6fd94967f530e996e8dac57735e0/Captura%20de%20Tela%202024-10-15%20a%CC%80s%2013.44.13.png)
![Versão Mobile](https://github.com/brunomedeirosluz/app-recipes/blob/c35f0dc2252076ff5b69b16cd3487aa722c058af/Captura%20de%20Tela%202024-10-15%20a%CC%80s%2013.45.06.png)

### Visualização em Notebook:
![Versão Notebook](https://exemplo.com/caminho-da-imagem-notebook)

## APIs Utilizadas

### TheMealDB API
O TheMealDB é um banco de dados aberto com receitas e ingredientes de todo o mundo.

Endpoints importantes:
- Listar categorias: [https://www.themealdb.com/api/json/v1/1/list.php?c=list](https://www.themealdb.com/api/json/v1/1/list.php?c=list)
- Listar nacionalidades: [https://www.themealdb.com/api/json/v1/1/list.php?a=list](https://www.themealdb.com/api/json/v1/1/list.php?a=list)
- Listar ingredientes: [https://www.themealdb.com/api/json/v1/1/list.php?i=list](https://www.themealdb.com/api/json/v1/1/list.php?i=list)

### TheCocktailDB API
Similar ao TheMealDB, focado em bebidas.

Endpoints importantes:
- Documentação geral: [https://www.thecocktaildb.com/api.php](https://www.thecocktaildb.com/api.php)

## Requisitos Técnicos

- Utilização do Redux para gerenciamento de estado.
- Utilização da biblioteca React-Redux.
- Utilização da Context API do React para gerenciamento de estado.
- Utilização dos React Hooks useState, useContext, useEffect.
- Criação de Hooks customizados.
- Projeto 100% responsivo.

## Instruções de Instalação e Execução

1. Clone este repositório.
2. Instale as dependências com `npm install`.
3. Execute o projeto com `npm start`.

## Autoria

Este projeto foi desenvolvido por um grupo de alunos da Trybe como parte do curso de desenvolvimento web.



## Autoria

Este projeto foi desenvolvido por um grupo de alunos da Trybe como parte do curso de desenvolvimento web.


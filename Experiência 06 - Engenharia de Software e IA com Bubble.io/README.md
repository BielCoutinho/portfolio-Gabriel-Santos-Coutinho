# 🚀 Aplicativo Web Bubble - Portfólio de No-Code & Engenharia Reversa

## 📝 Descrição do Projeto
Este repositório armazena e documenta a arquitetura de um aplicativo web interativo desenvolvido na plataforma **Bubble.io**. O projeto faz parte do portfólio de engenharia de software e aplicações de Inteligência Artificial, focado em demonstrar o uso de ferramentas *No-Code* para prototipagem rápida (*Rapid Prototyping*), modelagem de dados serverless e desenvolvimento visual responsivo.

O repositório centraliza o arquivo Blueprint (`.json`) exportado diretamente do ecossistema do Bubble, garantindo o controle de versão e o backup de toda a árvore lógica, banco de dados e fluxos de trabalho do sistema.

Desenvolvido por **Gabriel Santos Coutinho**.

---

## 🔗 Link do Aplicativo Rodando
Você pode testar a aplicação em tempo real diretamente pelo navegador através do link oficial:
👉 [Acessar Aplicativo no Bubble](https://gabrielsantoscoutinho2004-21306.bubbleapps.io/version-test?debug_mode=true)

---

## ⚙️ O que está salvo neste Repositório?
Como o Bubble.io opera de forma totalmente serverless e visual, ele não gera um código-fonte tradicional editável em HTML/JS. Em vez disso, o projeto é estruturado por:
* **`app_blueprint.json`:** O arquivo de configuração completo que contém todos os Workflows (fluxos de trabalho), a árvore de elementos visuais do editor e a estrutura das tabelas do banco de dados.
* **`README.md`:** Esta documentação técnica que guia o entendimento e os objetivos do projeto.

---

## 🚀 Arquitetura e Recursos Tecnológicos
A aplicação aproveita o poder do desenvolvimento visual moderno integrado a uma infraestrutura robusta e nativa do Bubble:

* **Frontend Visual:** Layout totalmente responsivo estruturado com o novo motor Flexbox/Grid do Bubble, garantindo adaptabilidade para dispositivos móveis, tablets e desktops.
* **Backend & Banco de Dados (Built-in):** Estrutura de tipos de dados (Data Types) relacionais nativos com regras de privacidade configuradas para segurança de dados.
* **Lógica Reativa (Workflows):** Fluxos de eventos baseados em gatilhos do usuário (cliques, mudanças de input, carregamento de página) acionando ações no banco de dados e transições de tela dinâmicas.

---

## 🔧 Como Reimportar este Projeto no Bubble
Caso queira recriar ou estudar este aplicativo dentro do seu próprio painel do Bubble, siga este passo a passo:

1. Faça o download do arquivo `.json` presente neste repositório.
2. Acesse sua conta no [Bubble.io](https://bubble.io/) e clique em **"Create an app"** (Criar um aplicativo).
3. Dentro do editor do seu novo app, vá no menu lateral esquerdo e clique em **Settings** (Configurações).
4. Acesse a aba **App plan** ou **Plan**.
5. Role a página até o final até encontrar a opção **Export / Import Application**.
6. Clique para fazer o upload do arquivo `.json` baixado. O Bubble irá reconstruir automaticamente toda a interface e lógica do sistema.

---
[Voltar ao início](https://github.com/seu-usuario/seu-usuario)

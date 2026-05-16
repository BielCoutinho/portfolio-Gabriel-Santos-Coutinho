# Neumorphism.io Clone - Sleek Interface

Um gerador de designs neomórficos interativo e moderno, inspirado no neumorphism.io, com foco em personalização em tempo real e uma interface "Sleek" minimalista.

![Neumorphism Demo](https://images.unsplash.com/photo-1614850523296-e8c041df43a6?auto=format&fit=crop&q=80&w=1024)

## 🚀 Funcionalidades

- **Gerador Interativo**: Ajuste em tempo real parâmetros como:
  - Tamanho (Size)
  - Raio da borda (Border Radius)
  - Distância da sombra (Distance)
  - Intensidade da sombra (Intensity)
  - Desfoque (Blur)
  - Cor Base (Base Color) com atualização dinâmica de toda a interface.
- **Formas Neomórficas**: Suporte para efeitos *Flat*, *Concave*, *Convex* e *Pressed*.
- **Cópia de Código**: Gera automaticamente o código CSS necessário para reproduzir o design em qualquer projeto.
- **Autenticação Firebase**: Sistema de login seguro via Google Authentication.
- **Perfil do Usuário**: Página dedicada para visualização de informações do perfil e estatísticas.
- **Ambiente Admin**: Painel administrativo condicional para usuários autenticados.
- **Design Responsivo**: Adaptado para Desktop e Mobile com foco na experiência do usuário.

## 🛠️ Tecnologias Utilizadas

- **React 19** com **Vite** para um desenvolvimento rápido e otimizado.
- **Tailwind CSS 4** para estilização utilitária e responsiva.
- **Firebase 12**:
  - **Authentication**: Login com Google.
  - **Firestore**: Armazenamento de usuários e futuramente de presets.
- **Framer Motion (motion/react)**: Para animações fluidas e transições de layout.
- **Lucide React**: Biblioteca de ícones consistente.
- **React Router 7**: Gerenciamento de rotas e navegação SPA.
- **TypeScript**: Garantia de tipagem e código robusto.

## 📂 Estrutura do Projeto

```text
src/
├── components/
│   ├── auth/          # Componentes de Login e Admin
│   ├── layout/        # Estrutura base da página (MainLayout)
│   ├── neumorphism/   # Núcleo do gerador (Preview, Controles, Exemplos)
│   └── ui/            # Componentes genéricos reutilizáveis
├── hooks/             # Hook useNeumorphism para lógica de estado
├── lib/               # Configurações do Firebase e utilitários
├── pages/             # Páginas principais (Home, Profile)
└── App.tsx            # Roteamento e ponto de entrada estilo
```

## ⚙️ Configuração Local

Para rodar este projeto localmente, siga os passos abaixo:

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/neumorphism-clone.git
   cd neumorphism-clone
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Configurar Variáveis de Ambiente:**
   Crie um arquivo `.env` baseado no `.env.example` e adicione suas credenciais do Firebase.

4. **Rodar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse em `http://localhost:3000`.

## 🔒 Segurança

O projeto utiliza **Firebase Security Rules** para proteger os dados no Firestore. As regras garantem que usuários autenticados possam acessar apenas seus próprios dados e que presets públicos sejam acessíveis globalmente, mantendo a integridade do sistema.

---

Criado com ❤️ por [Gabriel Santos Coutinho](mailto:gabriel.santos.coutinho2004@gmail.com)

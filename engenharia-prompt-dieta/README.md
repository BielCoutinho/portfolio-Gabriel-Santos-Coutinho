# 🥗 Planejador de Dieta Fitness - Engenharia de Prompt & Batalha de Modelos

## 📝 Descrição do Projeto
Este projeto consiste no desenvolvimento, estruturação e teste de um **Prompt Avançado em XML** projetado para gerar um *Planejador de Dieta Fitness* em uma página web única (Single Page Application) com HTML5 e CSS3 integrado. O objetivo do artefato foi criar uma interface responsiva e funcional, contendo formulário de usuário, galeria e cálculo automático de dieta.

Desenvolvido por **Gabriel Santos Coutinho** como parte da disciplina de **Engenharia de Prompt e Aplicações em IA**, o repositório centraliza a arquitetura do prompt utilizado e a análise crítica comparativa batizada de "Batalha de Modelos". O prompt estruturado foi submetido a 7 Grandes Modelos de Linguagem (LLMs) do mercado para avaliar a capacidade de interpretação de restrições técnicas, o nível de criatividade e a verbosidade (consumo de tokens) de cada ferramenta.

---

## ⚙️ O Prompt Estruturado (XML)
O prompt abaixo foi o artefato principal desenvolvido para este experimento, utilizando a sintaxe XML para isolar escopo, objetivos, diretrizes de design e métricas obrigatórias:

```xml
<tarefa>
  <objetivo>Criar uma página HTML5 única com CSS3 interno (single page).</objetivo>
  <tema>Planejador de dieta fitness</tema>
  
  <diretrizes_design>
    <layout>Responsivo e minimalista.</layout>
    <paleta_cores>verde claro, verde escuro, branco</paleta_cores>
    <tipografia>Sans-serif para títulos, Serif para corpo.</tipografia>
  </diretrizes_design>
  
  <obrigatoriedades_tecnicas>
    <item>Menu de navegação funcional (âncoras).</item>
    <item>Seção de portfólio ou galeria.</item>
    <item>Rodapé com informações de contato simuladas.</item>
    <item>Formulário do usuário</item>
    <item>Montagem da dieta</item>
    <item>Visualização da dieta</item>
    <item>Calculo automático</item>
  </obrigatoriedades_tecnicas>
  
  <metrica_obrigatoria>
    Ao final da resposta, informe uma estimativa de quantos tokens foram gerados para este código.
  </metrica_obrigatoria>
</tarefa>

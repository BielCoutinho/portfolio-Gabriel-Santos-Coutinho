# 📝 Engenharia de Prompt: Validação de Estruturas XML em LLMs

## 📝 Descrição do Projeto
Este projeto consiste no desenvolvimento, estruturação e teste de um **Prompt Avançado em XML** voltado para a criação de aplicações web em uma única página (Single Page Application). [cite_start]O objetivo prático do prompt foi instruir uma Inteligência Artificial a gerar um *Planejador de Dieta Fitness* responsivo e funcional[cite: 5, 7].

[cite_start]Desenvolvido por **Gabriel Santos Coutinho** [cite: 3] [cite_start]como parte da disciplina de **Engenharia de Prompt e Aplicações em IA** [cite: 1][cite_start], o repositório centraliza a arquitetura do prompt utilizado e uma análise crítica comparativa ("Batalha de Modelos")[cite: 2, 8]. [cite_start]O prompt foi submetido a 7 Grandes Modelos de Linguagem (ChatGPT, Gemini, Claude, Qwen, DeepSeek, Grok e Maritaca) para avaliar a capacidade de cada um em interpretar tags customizadas e restrições técnicas complexas[cite: 6].

## ⚙️ O Prompt Estruturado (XML)
[cite_start]O prompt abaixo foi o artefato principal desenvolvido para este experimento, utilizando a sintaxe XML para isolar escopo, objetivos, diretrizes de design e métricas obrigatórias[cite: 5, 7]:

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

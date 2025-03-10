# TDD na Prática - Full Cycle

Este repositório contém os estudos e implementações realizados durante o curso **"TDD na Prática"** da [Full Cycle](https://fullcycle.com.br/), aplicando as melhores práticas de **Test-Driven Development (TDD)** no desenvolvimento de software.(Curso em progresso - 10/03/2025)

## 📌 Sobre o Curso

O curso tem como objetivo ensinar a prática de **TDD** de maneira aprofundada, permitindo que o desenvolvedor escreva testes eficazes e desenvolva código com alta qualidade. Durante o curso, são abordados conceitos fundamentais do desenvolvimento orientado a testes, cobrindo desde a teoria até aplicações reais em projetos complexos.

## 🛠️ Tecnologias Utilizadas

- **Linguagem**: Java
- **Framework de Testes**: JUnit
- **Mocking e Stubbing**: Mockito
- **Ferramentas Auxiliares**: Lombok, Spring Boot (quando necessário)

## 📖 Conteúdo do Curso

### 🔹 Fundamentos do TDD
- O que é TDD e por que utilizá-lo?
- Red, Green, Refactor: O ciclo do TDD
- Diferença entre **teste de unidade**, **teste de integração** e **teste de aceitação**

### 🔹 Escrevendo Testes Eficazes
- Estrutura de um bom teste: **Given-When-Then**
- Aplicação dos princípios **FIRST** (Fast, Independent, Repeatable, Self-Validating, Timely)
- Como evitar testes frágeis e garantir testes confiáveis

### 🔹 Testando Diferentes Camadas da Aplicação
- Testes para **serviços** e **regras de negócio**
- Testes para **repositórios** (interação com banco de dados)
- Testes para **controladores REST** utilizando Mocks

### 🔹 Isolamento de Dependências
- Uso de **Mockito** para criar **mocks** e **stubs**
- Testes com **Dependency Injection** e **Mock Beans**
- Como testar código que depende de serviços externos

### 🔹 Cobertura de Código e Boas Práticas
- Medindo a **cobertura de testes** com ferramentas adequadas
- Estratégias para manter um **bom design de código** com TDD
- Como evitar **over-testing** e focar nos testes realmente necessários

### 🔹 Refatoração Guiada por Testes
- Como o TDD auxilia na refatoração segura do código
- Identificação e eliminação de **código morto**
- Técnicas para tornar os testes mais performáticos e legíveis

## 🚀 Como Executar os Testes

Para rodar os testes do projeto, siga os passos abaixo:

```sh
# Clonar o repositório
git clone https://github.com/daniel2dfla/TDD-FullCycle.git

# Acessar o diretório do projeto
cd TDD-FullCycle

# Executar os testes
./mvnw test  # Caso esteja usando Maven
# ou
./gradlew test  # Caso esteja usando Gradle

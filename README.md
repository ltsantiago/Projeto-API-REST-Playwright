# Automação de Testes de API com Playwright

Este projeto consiste na automação de testes de API utilizando o framework Playwright para testar a API ServeRest, uma API REST para estudos que simula um e-commerce.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Playwright** - Framework para automação de testes
- **JavaScript** - Linguagem de programação
- **Faker.js** - Geração de dados de teste
- **Git** - Controle de versão

## 📂 Estrutura do Projeto

```
serverest-api/
├── .github/                  # Configurações do GitHub
├── .vscode/                  # Configurações do VS Code
├── ServerRestAPI/            # Documentação e recursos da API
├── tests/                    # Testes automatizados
│   ├── e2e/                  # Testes de ponta a ponta
│   │   ├── auth/             # Testes de autenticação
│   │   ├── cart/             # Testes de carrinho
│   │   ├── products/         # Testes de produtos
│   │   └── user/             # Testes de usuários
│   └── support/              # Suporte para os testes
|       ├── factories/        # Massa de dados de teste
│       ├── fixtures/         # Dados de teste
│       └── utils/            # Utilitários
├── .gitignore               # Arquivos ignorados pelo Git
├── package.json             # Dependências e scripts
├── playwright.config.js      # Configuração do Playwright
└── README.md                # Este arquivo
```

## 🔧 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Git (para controle de versão)

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/ltsantiago/Projeto-API-REST-Playwright
   cd serverest-api
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

## 🚀 Executando os Testes

### Executar todos os testes
```bash
npx playwright test
```

### Executar testes específicos
```bash
# Testes de autenticação
npx playwright test tests/e2e/auth/

# Testes de produtos
npx playwright test tests/e2e/products/
```

### Executar em modo UI
```bash
npx playwright test --ui
```

### Gerar relatório de testes
```bash
npx playwright show-report
```

## 📊 O que foi automatizado

### Autenticação
- Login de usuário
- Validação de credenciais
- Gerenciamento de tokens

### Usuários
- Cadastro de novos usuários
- Consulta de usuários
- Atualização de dados
- Exclusão de contas

### Produtos
- Cadastro de produtos
- Listagem de produtos
- Atualização de produtos
- Exclusão de produtos

### Carrinho
- Adição de itens
- Remoção de itens
- Finalização de compra

## 🛡️ Boas Práticas Implementadas


1. **Dados de Teste**
   - Uso do Faker.js para geração de dados dinâmicos
   - Fixtures para dados estáticos

2. **Configuração**
   - Ambiente configurável para diferentes estágios (dev, staging, prod)
   - Timeouts configuráveis

3. **Relatórios**
   - Geração de relatórios HTML detalhados
   - Screenshots em falhas


## 🤝 Como Contribuir

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Adicione suas mudanças (`git add .`)
4. Comite suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push da Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✉️ Contato

Seu Nome - Lucas Tiago - ltsantiago88@gmail.com

Link do Projeto: [https://github.com/ltsantiago/Projeto-API-REST-Playwright](https://github.com/ltsantiago/Projeto-API-REST-Playwright)

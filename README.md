# Cantina CESAR — Sistema de Pedidos (PoC)

Aplicação web responsiva para a cantina da CESAR School: o aluno consulta o cardápio, monta o carrinho, confirma o pedido e acompanha o preparo, sem fila no intervalo de 15 minutos.

React + Vite + JavaScript + CSS puro. Sem backend: dados fictícios e `localStorage`.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist/
npm run preview  # serve o build
```

## Roteiro de demonstração

1. **Início** → clique em **Fazer pedido**.
2. **Cardápio** → filtre por categoria, busque por "coxinha" e adicione itens (o card vira um contador).
3. **Carrinho** → altere quantidades, remova itens, veja subtotal e total → **Finalizar pedido**.
4. **Checkout** → informe o nome, escolha PIX ou dinheiro → **Confirmar pedido**.
5. **Acompanhamento** → o pedido recebe um número (ex.: `CC-101`). Use **Avançar status** ou **Simular automaticamente** para passar por *Pedido recebido → Em preparação → Pronto para retirada*.
6. Recarregue a página: carrinho e pedidos continuam lá. Volte ao **Início** e veja o pedido atual em destaque.
7. Rodapé → **Reiniciar demonstração** limpa tudo.

## Estrutura

```
src/
├── config/        navigation.js, storageKeys.js
├── data/          products, categories, paymentMethods, orderStatuses, productRepository
├── services/      cartService, orderService, menuService, pricing, storage, demoService  (lógica pura)
├── hooks/         usePersistentState, useCartState, useOrdersState, useStudentName, useAutoAdvance
├── context/       CartContext, OrdersContext
├── router/        navigation, useRoute, routes  (roteador por hash, sem dependências)
├── components/    Header, Footer, BottomNav, Home, Menu, ProductCard, ProductGrid,
│                  Cart, CartItem, Checkout, PaymentSelector, OrderTracking
│   ├── home/      HomeHero, CurrentOrderBanner, PopularProducts, HowItWorks
│   ├── tracking/  StatusHero, OrderProgress, DemoControls, OrderItemsList, OrderHistory
│   └── ui/        Icon, Logo, Link, QuantityStepper, StatusBadge, EmptyState, PageHeader, PriceBreakdown
└── styles/        global.css (tokens + base) — cada componente tem seu próprio .css
```

Fluxo de dependências: **componentes → hooks/contexto → serviços → dados**. Serviços não importam React.

## Princípios do capítulo 5 — onde aparecem

| Princípio | Onde ver no código |
|---|---|
| **Responsabilidade Única** | `cartService` só calcula carrinho; `orderService` só regras de pedido; `menuService` só filtra/agrupa; `ProductCard` só desenha um produto; `Checkout` só coleta dados e dispara a confirmação. |
| **Coesão** | Tudo sobre preço está em `pricing.js`; tudo sobre status do pedido em `orderService.js` + `orderStatuses.js`; cada tela tem seu `.css` ao lado. |
| **Acoplamento** | `ProductCard`, `QuantityStepper`, `CategoryFilter` e `PaymentSelector` são apresentacionais: recebem props e callbacks e não conhecem carrinho nem pedidos. Apenas `ProductGrid` liga cards ao carrinho. |
| **Ocultamento de Informação** | Ninguém além de `productRepository.js` conhece o array `PRODUCTS`. A chave do `localStorage` fica em `storageKeys.js` e só os hooks a usam. `useCartState` expõe `add`, `increase`, `total`… e esconde como o estado é guardado. |
| **Segregação de Interfaces** | Dois contextos separados (`useCart`, `useOrders`): um componente só depende do que usa. Componentes pequenos (`DemoControls` recebe só 4 props). |
| **Inversão de Dependências** | Hooks recebem `storage` e `findProduct` por parâmetro (com padrão) e dependem de `{ read, write, remove }`, não do `localStorage`. Nos testes basta `createStorage(createMemoryBackend())`. |
| **Aberto/Fechado** | Nova **categoria** → 1 item em `categories.js`. Novo **produto** → 1 item em `products.js`. Nova **forma de pagamento** → 1 item em `paymentMethods.js`. Novo **status** → 1 item em `orderStatuses.js` (a linha do tempo e o avanço se ajustam). Nova **rota** → 1 linha em `routes.js`. |
| **Lei de Demeter** | As linhas do carrinho são "achatadas" (`line.name`, não `line.product.name`); componentes chamam `cart.add(id)` e `orders.place(...)` em vez de manipular listas internas. |

## Decisões de simplicidade (versão Go Horse)

- Preços em **centavos** (inteiros) para evitar erros de ponto flutuante.
- Roteador de ~40 linhas por `hash` em vez de biblioteca: funciona em qualquer hospedagem estática.
- "Imagem ilustrativa" feita com emojis sobre fundos coloridos por categoria: zero arquivos de imagem.
- Só **3 estados** de pedido. "Já retirei meu pedido" apenas arquiva o pedido (campo `archived`), sem criar um 4º estado.
- Sem testes automatizados nesta versão; as funções de `services/` são puras e prontas para serem testadas.

## Próximos passos sugeridos

- Backend real e painel da cantina para atualizar o status de verdade.
- Testes unitários dos serviços (Vitest).
- Estoque, horário de funcionamento e notificações.

# App RPG – Refatoração com React Native Paper

Este projeto foi refatorado para uma estrutura mais profissional, com componentização, uso de biblioteca de UI e melhorias de usabilidade/visuais.

## O que foi feito

1) Componentização
- Criados componentes em `components/`:
  - `Header`: cabeçalho do app usando `Appbar` do React Native Paper.
  - `AddCharacterForm`: formulário para adicionar personagens com `TextInput` e `Button` do Paper.
  - `CharacterCard`: card para cada personagem com ações (recrutar/remover).
- `App.js` agora concentra a lógica principal, estado, filtros e navegação visual.

2) Biblioteca de UI
- Adotado React Native Paper.
- Substituições realizadas:
  - `TouchableOpacity` -> `Button`/ações dentro de `Card`.
  - `TextInput` nativo -> `TextInput` do Paper (modo `outlined`).
  - Layout da lista -> `Card` (`CharacterCard`).

3) Melhorias implementadas (3+)
- Modal de confirmação (Dialog do Paper)
  - Ao adicionar um personagem (confirmação do nome informado).
  - Ao remover um personagem (confirmação com nome).
- Ícones visuais
  - Usados ícones do Paper (ex.: `account-plus`, `delete`) e `MaterialIcons` no avatar do card.
- Feedback visual (Snackbar)
  - Exibido ao adicionar, remover e recrutar/desmarcar personagem.
- Filtro de personagens (extra)
  - `SegmentedButtons` para alternar entre: Todos, Disponíveis e Recrutados.
- Animações (extra)
  - `LayoutAnimation` para suavizar adicionar/remover e alternar recrutamento.

## Por que foi feito
- Separação de responsabilidades, facilitando manutenção e testes.
- Consistência visual e melhor experiência do usuário com componentes acessíveis.
- Prevenir ações acidentais (confirmação) e dar feedback claro (Snackbar).
- Melhor navegação pela lista (filtro) e sensação de fluidez (animações).

## Valor para o app
- Interface mais moderna e coerente.
- Fluxos de uso mais seguros e informativos.
- Código mais organizado e escalável para futuras funcionalidades (ex.: integração com SQLite).

## Como rodar
1. Instale dependências
```
npm install
```
2. Execute
```
npm run start
```

Caso o PowerShell bloqueie scripts (ExecutionPolicy), rode como Administrador:
```
Set-ExecutionPolicy RemoteSigned
```

## Próximos passos (opcional)
- Persistir personagens com `expo-sqlite`.
- Tematizar o Paper (`MD3`) com cores do app.
- Testes unitários dos reducers/ações de lista.

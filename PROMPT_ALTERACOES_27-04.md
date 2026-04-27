# WORKSPACE GOV — PROMPT DE ALTERAÇÕES
# Data: 27/04/2026 | Branch: alteracao-22-04

> Projeto localizado em: D:\diretório-workshop\projeto-workspace
> Usar como base o WORKSPACE_GOV_MASTER_PROMPT.md (v1.0)

---

## CONTEXTO DO PROJETO

Sistema B2B Governamental — React + TypeScript + Ant Design + Material Design Icons.
Componentes principais: `DrawerAgendamento.tsx`, `CalendarModule.tsx`, `CreateEventModal.tsx`, `Header.tsx`, `App.tsx`.

---

## ALTERAÇÃO 1 — Drawer de Agendamento: Perfil Secretária

**ESCOPO:** `DrawerAgendamento.tsx`

**OBJETIVO:** No perfil de Secretária, ao abrir o drawer de um evento já agendado, exibir APENAS o botão "Solicitar alteração ou cancelamento". Remover os botões "Editar agendamento" e "Cancelar agendamento" para este perfil.

**NÃO ALTERAR:**
- Comportamento do botão "Solicitar alteração ou cancelamento"
- A modal que abre após clicar em "Solicitar alteração ou cancelamento" (manter exatamente como está hoje)
- O componente de alerta que aparece após enviar a mensagem pela modal (manter exatamente como está hoje)
- Qualquer outro campo, ícone ou informação exibida no drawer
- Comportamento para outros perfis (Colaborador, Líder, Admin)

**ALTERAÇÃO:**
- Verificar o perfil do usuário atual (userProfile ou similar)
- Se perfil === 'secretaria' (ou equivalente no código): renderizar SOMENTE o botão "Solicitar alteração ou cancelamento"
- Ocultar completamente os botões "Editar agendamento" e "Cancelar agendamento" para este perfil

**RESULTADO ESPERADO:**
```
Drawer aberto por Secretária:
  ✅ Botão: "Solicitar alteração ou cancelamento"
  ❌ Botão "Editar agendamento" — NÃO aparece
  ❌ Botão "Cancelar agendamento" — NÃO aparece

Fluxo após clicar em "Solicitar alteração ou cancelamento":
  1. Abre modal existente → usuário preenche mensagem → clica Enviar
  2. Modal fecha → componente de alerta aparece (comportamento atual mantido)
```

---

## ALTERAÇÃO 2 — Remover ícone de triângulo vermelho do evento com data raxurada

**ESCOPO:** `CalendarModule.tsx` (visualização Dia/Semana/Mês) e/ou `DrawerAgendamento.tsx`

**OBJETIVO:** Quando um evento está com status "Pendente Alteração" (data em vermelho e raxurada/tachada), há um ícone de triângulo de alerta vermelho sendo exibido. Esse ícone deve ser removido.

**NÃO ALTERAR:**
- O texto em vermelho com efeito de riscado/tachado na data (manter)
- O badge/tag "Pendente Alteração" (manter)
- O overlay diagonal rosa/vermelho do evento na grade (manter)
- Qualquer outro comportamento ou visual do evento

**ALTERAÇÃO:**
- Localizar onde o ícone de triângulo (⚠️ ou AlertCircle ou similar do lucide-react) é renderizado junto à data raxurada
- Remover apenas esse ícone
- Manter todo o restante do visual intacto

**RESULTADO ESPERADO:**
```
Evento com "Pendente Alteração":
  ✅ Data em vermelho raxurada — mantida
  ✅ Badge "Pendente Alteração" — mantido
  ✅ Overlay diagonal — mantido
  ❌ Ícone triângulo/alerta vermelho — REMOVIDO
```

---

## ALTERAÇÃO 3 — Remover campo de busca do Header

**ESCOPO:** `Header.tsx`

**OBJETIVO:** Remover completamente o campo de busca central ("Buscar salas, compromissos ou pessoas") do header.

**NÃO ALTERAR:**
- Logo/nome "Workspace Gov" (lado esquerdo)
- Ícone de informação (ⓘ)
- Botão "Personalizar Home"
- Avatar/ícone de perfil do usuário
- Altura, cor de fundo e demais estilos do header

**ALTERAÇÃO:**
- Remover o componente Input/Search de busca do header
- Ajustar o layout para que os elementos restantes fiquem bem distribuídos sem o campo de busca

**RESULTADO ESPERADO:**
```
Header:
  [Logo Workspace Gov]          [ⓘ]  [⚙ Personalizar Home]  [Avatar]
  SEM campo de busca no centro
```

---

## ALTERAÇÃO 4 — Remover seletor de cores da Modal de Criar Agendamento

**ESCOPO:** `CreateEventModal.tsx`

**OBJETIVO:** Remover completamente a seção de seleção de cores da sala (componente `RoomColorPicker`) da modal de criação de agendamento.

**NÃO ALTERAR:**
- Campo de seleção de sala (select de sala permanece)
- Todos os outros campos do formulário
- Lógica de validação e submissão
- Estilos gerais da modal

**ALTERAÇÃO:**
- Remover o componente `RoomColorPicker` e sua renderização condicional abaixo do campo de sala
- Remover o texto "Escolha uma cor para esta sala"
- Remover o texto "Cores acinzentadas já estão em uso. Vermelho reservado para o sistema."
- Remover as props `roomColors` e `onRoomColorChange` se não forem utilizadas em nenhum outro lugar
- Remover o import do `RoomColorPicker` se existir como import separado

**RESULTADO ESPERADO:**
```
Modal "Criar novo agendamento":
  Tipo de reunião
  Assunto
  Local
  Sala [select existente — mantido]
  ❌ "Escolha uma cor para esta sala" — REMOVIDO
  ❌ Paleta de 12 bolinhas coloridas — REMOVIDA
  ❌ Texto de aviso de cores — REMOVIDO
  Informações complementares
  Itens da copa
  ... (restante do formulário mantido)
```

---

## COMMIT E DEPLOY

Após aplicar todas as alterações:

```powershell
cd D:\diretório-workshop\projeto-workspace

git add src/components/DrawerAgendamento.tsx
git add src/components/CalendarModule.tsx
git add src/components/Header.tsx
git add src/components/CreateEventModal.tsx
git commit -m "feat: alteracoes 27-04 - drawer secretaria, remove triangulo, remove busca header, remove color picker modal"
git push origin HEAD
vercel --prod --force
```

---

## OBSERVAÇÕES PARA O CLAUDE CODE

1. Verificar o nome exato da variável de perfil do usuário (pode ser `userProfile`, `profile`, `currentUser.role`, etc.) antes de implementar a Alteração 1.
2. Para a Alteração 2, o ícone pode estar no `DrawerAgendamento.tsx` ou diretamente no `CalendarModule.tsx` — verificar nos dois arquivos.
3. Para a Alteração 4, verificar se `RoomColorPicker` é um componente em arquivo separado ou está inline no `CreateEventModal.tsx`. Se for arquivo separado, pode ser deletado também.

---

*Prompt gerado em: 27/04/2026*
*Versão das alterações: sprint 27-04*
*Base: WORKSPACE_GOV_MASTER_PROMPT v1.0*

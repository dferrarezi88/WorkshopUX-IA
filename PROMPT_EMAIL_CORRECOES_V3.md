# CORREÇÕES PONTUAIS — MÓDULO DE E-MAIL v3
# Cole no Claude Code (cursor >)

## REGRA ABSOLUTA
Aplicar SOMENTE as correções listadas abaixo.
NÃO alterar nada além do que está descrito.
NÃO alterar layout, grid, estrutura de componentes.
NÃO alterar cores que já estão corretas.

## PASSO 1 — BRANCH
git checkout -b feature/email-correcoes-v3

## PASSO 2 — LEIA OS ARQUIVOS ANTES DE EDITAR
Leia todos os arquivos do módulo de e-mail:
- ./src/components/EmailsModule.tsx
- ./src/components/email/ (todos)
- ./src/pages/EmailPage.tsx

Leia as imagens de referência:
- ./design-reference/email/03-caixa-de-email.png
- ./design-reference/email/04-email-selecionado.png
- ./design-reference/email/05-visualizacao-email.png

---

## CORREÇÃO 1 — REMOVER A ESTRELA PRETA DIVISÓRIA

PROBLEMA: Existe uma estrela preta (★) no meio da lista separando
e-mails não lidos dos lidos. Isso não deve existir.

CORREÇÃO:
- Remover completamente o elemento separador com estrela preta
- Substituir por uma linha horizontal simples (border-bottom: 1px solid #f0f0f0)
  OU não ter separador nenhum
- NÃO alterar nada mais na lista

---

## CORREÇÃO 2 — REMOVER AS CAIXINHAS DE SELEÇÃO (CHECKBOXES)

PROBLEMA: Existem checkboxes (□) à esquerda de cada e-mail na lista.
O design de referência não tem checkboxes visíveis por padrão.

CORREÇÃO:
- Remover os checkboxes da visualização padrão da lista
- NÃO remover a funcionalidade de seleção múltipla — apenas ocultar os checkboxes
- Se quiser manter seleção, pode aparecer SOMENTE ao hover com opacity transition
- NÃO alterar o restante do layout do item

---

## CORREÇÃO 3 — HOVER AZUL CLARO NOS ITENS DA LISTA

PROBLEMA: O hover atual não está com a cor correta.

CORREÇÃO:
- Hover no item da lista: background-color #EFF6FF (azul muito claro)
- Item selecionado/ativo (e-mail aberto): background-color #DBEAFE (azul claro)
- Transição suave: transition: background-color 0.15s ease
- NÃO alterar padding, altura ou outros estilos

CSS a aplicar nos itens da lista de e-mail:
```css
.email-list-item:hover {
  background-color: #EFF6FF;
  cursor: pointer;
}

.email-list-item.active {
  background-color: #DBEAFE;
}
```

---

## CORREÇÃO 4 — MENU "..." COM AÇÕES FUNCIONAIS

PROBLEMA: O menu de contexto (3 pontinhos) existe mas as ações
não estão funcionando corretamente.

CORREÇÃO — implementar todas estas ações com efeito real no estado:

1. "Adicionar aos Favoritos" / "Remover dos Favoritos":
   - Toggle: se não é favorito → adiciona (estrela fica dourada #faad14)
   - Se já é favorito → remove (estrela some ou fica cinza)
   - Atualizar o estado do e-mail imediatamente

2. "Marcar como Lido":
   - isRead = true
   - Remover ponto azul do avatar
   - Tag muda de "Não Lido" (azul) para "Lido" (cinza)
   - Título perde o negrito

3. "Marcar como não Lido":
   - isRead = false
   - Adicionar ponto azul no avatar
   - Tag muda para "Não Lido" (azul)
   - Título fica em negrito

4. "Mover para Spam":
   - Remover o e-mail da lista atual
   - Adicionar na pasta Spam
   - Mostrar toast: "E-mail movido para spam"

5. "Excluir":
   - Remover o e-mail da lista
   - Adicionar na pasta Lixeira
   - Mostrar toast: "E-mail excluído"

O menu deve fechar após qualquer ação.

---

## CORREÇÃO 5 — BOTÃO X PARA FECHAR O PAINEL DE LEITURA

PROBLEMA: Quando o usuário clica em um e-mail e o painel de leitura
abre, não existe botão para fechar esse painel.

CORREÇÃO:
- Adicionar ícone X (close) no canto superior direito do painel de leitura
- Posição: absolute, top: 12px, right: 16px
- Estilo: ícone cinza #8c8c8c, 20px, sem fundo, cursor pointer
- Hover: cor #262626
- Ao clicar: fechar o painel (voltar lista para largura total)
- NÃO alterar o restante do painel

```tsx
// Exemplo do botão X a adicionar no topo do painel de leitura:
<button
  onClick={() => setSelectedEmail(null)}
  style={{
    position: 'absolute',
    top: '12px',
    right: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#8c8c8c',
    fontSize: '20px',
    lineHeight: 1,
    padding: '4px',
  }}
>
  ✕
</button>
```

---

## CORREÇÃO 6 — TAB-BAR: ESTILO IGUAL À IMAGEM DE REFERÊNCIA

PROBLEMA: As tabs (Todas / Não Lidos / Lidos / Favoritos) não estão
com o visual correto — as cores estão diferentes do protótipo.

REFERÊNCIA VISUAL (imagem 03 anexada):
- Tab ativa "Todas": fundo azul claro #EFF6FF, texto azul #1D4ED8,
  borda inferior 2px solid #1D4ED8, sem borda nas outras laterais
- Tabs inativas: fundo transparente, texto cinza #6B7280
- Hover nas inativas: fundo #F3F4F6, texto #374151
- Ícones nas tabs: 14px, mesma cor do texto

CSS EXATO a aplicar (adicionar em globals.css ou no componente):

```css
/* Tab bar de e-mail */
.email-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 12px;
}

.email-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 400;
  color: #6B7280;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-bottom: -1px;
}

.email-tab:hover {
  background-color: #F3F4F6;
  color: #374151;
}

.email-tab.active {
  color: #1D4ED8;
  background-color: #EFF6FF;
  border-bottom: 2px solid #1D4ED8;
  font-weight: 500;
}

.email-tab svg,
.email-tab .tab-icon {
  width: 14px;
  height: 14px;
  color: inherit;
}
```

Aplicar essas classes nos elementos de tab existentes.
Se as tabs usam outro sistema de classes (ex: Tailwind ou shadcn),
traduzir para o equivalente mantendo os valores exatos de cor.

---

## VALIDAÇÃO FINAL

Confirmar que:
[ ] Estrela preta divisória removida da lista
[ ] Checkboxes removidos da visualização padrão
[ ] Hover nos itens está azul claro (#EFF6FF)
[ ] Menu "..." tem todas as 5 ações funcionando com efeito real
[ ] Botão X no painel de leitura fecha o painel
[ ] Tabs com estilo correto (ativa azul, inativas cinza)
[ ] Nenhuma outra parte do sistema foi alterada

---

## COMMIT FINAL

git add .
git commit -m "fix: e-mail v3 - remove checkbox/estrela, hover azul, menu ações, btn fechar, tabs"
git push origin feature/email-correcoes-v3

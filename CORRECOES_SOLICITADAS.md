# Correções solicitadas e aplicadas

## Qualidade visual
- Primeira tela preservada no padrão aprovado.
- Artes exibidas mantendo a proporção original; nenhuma tela usa `object-fit: fill`.
- `object-fit: contain` aplicado às artes principais para impedir esticamento e cortes.
- Removidos filtros de blur/desfoque e transformações que poderiam degradar a imagem.
- Mapa substituído por arte HD 1536×1024.
- Floresta substituída por arte HD 1536×1024 com toras próprias para receber interação.
- Preload das principais imagens para reduzir piscadas e carregamento visual ruim.
- Textos HTML permanecem nítidos e responsivos em vez de serem ampliados como parte de uma imagem pequena.

## Interface
- Não inicia sem nome.
- Não inicia sem escolher personagem.
- Nome não vem preenchido com “Pedro” ou outro nome salvo.
- Seleção do personagem recebe destaque visual.
- Botão VOLTAR é um controle real e clicável dentro do jogo.
- Elementos meramente decorativos não recebem função falsa.
- No mapa, a própria área ilustrada de cada fase funciona como hotspot clicável, evitando cartões duplicados sobre a imagem.
- Na Floresta, as letras são colocadas diretamente nas toras, sem círculos/cartões extras por cima.

## Jogabilidade
- 5 fases, 10 atividades por fase, total de 50.
- Contador de estrelas limitado a 50.
- Ao terminar as 10 atividades da Fase 1, abre automaticamente a Fase 2.
- Fase 2 → Fase 3 automaticamente.
- Fase 3 → Fase 4 automaticamente.
- Fase 4 → Fase 5 automaticamente.
- Ao concluir a Fase 5, abre a conclusão da aventura.
- Progresso salvo localmente.
- Mapa continua acessível como navegação secundária.

## Publicação
- Projeto estático compatível com Netlify.
- `netlify.toml` incluído.
- Projeto compatível com GitHub Pages.
- Workflow de GitHub Pages incluído.
- `.nojekyll` incluído.
- Caminhos de assets são relativos, adequados para Netlify e GitHub Pages.

## Observação de design
O princípio adotado é: **a ilustração faz parte da interface do jogo**. Os elementos clicáveis são posicionados sobre áreas planejadas da própria arte, sem colocar uma segunda “imagem de botão” sobre um botão já desenhado no cenário.

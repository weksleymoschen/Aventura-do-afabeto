ACADEMIA DOS SUPER-HERÓIS DAS LETRAS — WM JOGOS EDUCATIVOS

COMO TESTAR
1. Extraia o ZIP.
2. Abra index.html em Chrome/Edge ou publique a pasta em hospedagem estática.
3. Digite um nome, escolha um dos quatro heróis e clique em COMEÇAR A AVENTURA.

NETLIFY
Envie o arquivo Academia_Super_Herois_Letras_WM_FINAL.zip por deploy manual. O index.html está na raiz do ZIP.

GITHUB PAGES
Envie todo o conteúdo da pasta para a raiz do repositório. O arquivo .nojekyll já está incluído. Ative Pages para a branch desejada.

ESTRUTURA
index.html — estrutura das telas.
css/style.css — visual e responsividade.
js/game.js — estado, 25 missões, mapa, áudio e progressão.
assets/backgrounds — cenários.
assets/avatars — quatro heróis.
assets/objects — imagens/ilustrações das respostas.
AUDITORIA_FINAL.txt — verificações e limitações de teste.

ALTERAR ATIVIDADES
As perguntas estão no array phases em js/game.js. Cada missão contém:
c = letra/sílaba/palavra exibida;
correct = nome do arquivo/resposta correta;
o = lista fixa das alternativas.
Não altere o nome de um objeto sem manter o arquivo correspondente em assets/objects.

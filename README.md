# Aventura Encantada das Palavras

Jogo de alfabetização para crianças de aproximadamente 4 a 7 anos. Projeto estático em HTML, CSS e JavaScript, com cinco mundos, vinte e cinco desafios, progresso reiniciado a cada abertura, efeitos sonoros sintetizados no navegador e fala em português do Brasil quando disponível.

## Abrir no computador

Abra `index.html` no Chrome ou Edge. Para testar em um servidor local, entre nesta pasta e execute:

```bash
python3 -m http.server 8080
```

Acesse `http://localhost:8080`.

## Publicar no Netlify

Arraste a pasta `aventura-encantada` para o Netlify Drop ou conecte o repositório. Não há etapa de build. O diretório publicado deve conter `index.html` e a pasta `assets`.

## Recursos

- Layout adaptável para desktop, tablet e celular.
- Mapa com progressão entre cinco mundos.
- 25 desafios em cinco mundos: arrastar e soltar, memória de pares, completar palavras, ordenar letras e montar frases.
- Pistas faladas e feedback positivo; estrelas não são retiradas.
- Nome e progresso não são guardados; cada nova abertura começa com o campo em branco e zero estrelas.
- Cenários e avatares incluídos localmente em `assets`.

O navegador pode exigir um clique inicial para liberar áudio e voz. A disponibilidade da voz em português depende das vozes instaladas no dispositivo.

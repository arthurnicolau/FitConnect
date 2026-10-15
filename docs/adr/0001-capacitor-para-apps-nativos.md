# Apps Android e iOS via Capacitor, a partir do mesmo código web

O FitConnect precisa rodar no Android e no iOS, mas é um app web em HTML/CSS/JS puro e o desenvolvimento acontece num Windows sem Mac. Decidimos empacotar o mesmo código web com Capacitor (e publicar também como PWA), em vez de reescrever em React Native ou Flutter, para manter uma única base de código e não exigir conhecimento nativo.

## Consequências

- Os arquivos web ficam na raiz do repositório (para o GitHub Pages servir a PWA) e `npm run build` os copia para `www/`, que é o que o Capacitor empacota. Não mova os arquivos para `www/` nem edite nada lá: a pasta é gerada.
- O identificador do app é `com.arthurnicolau.fitconnect`. Depois de publicado nas lojas, ele não pode mais mudar.
- O app iOS só pode ser compilado em macOS: sem Mac, o build será feito na nuvem (ex.: GitHub Actions com runner macOS ou Codemagic), o que exige conta Apple Developer.

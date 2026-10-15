# FitConnect

Aplicativo para encontrar parceiros de treino perto de você: corrida, pedal, yoga, futebol e mais.

> Protótipo: os dados ainda são simulados e ficam só na memória (somem ao reabrir o app).

## Como rodar

**No navegador:** abra o `index.html`. No computador, o app aparece dentro de uma moldura de celular; no celular, ocupa a tela inteira.

**Como app instalável (PWA):** publicado pelo GitHub Pages. No celular, abra o link e:
- Android (Chrome): menu ⋮ → **Instalar app**
- iPhone (Safari): botão Compartilhar → **Adicionar à Tela de Início**

**Android nativo (APK):**

```
npm install
npm run apk
```

O APK sai em `android/app/build/outputs/apk/debug/app-debug.apk`. Requer JDK 21 e Android SDK 36 (`JAVA_HOME` e `ANDROID_HOME` configurados). `npm run android` abre o projeto no Android Studio, se instalado.

**iOS nativo:** o projeto está em `ios/`, mas só compila em macOS (Xcode). Veja a [ADR 0001](docs/adr/0001-capacitor-para-apps-nativos.md).

> Edite sempre os arquivos da raiz (`index.html`, `app.js`, `style.css`...). A pasta `www/` é gerada por `npm run build`.

## Documentação

- [GLOSSARY.md](GLOSSARY.md): a linguagem do app (Evento, Organizador, Requisitos, Conexão...)
- [docs/SPEC.md](docs/SPEC.md): as regras de produto
- [docs/adr/](docs/adr/): decisões de arquitetura

## Roadmap

1. ✅ Visual de aplicativo (navegação por abas, bottom sheet, modo escuro, moldura de celular)
2. ⏳ Banco de dados e login real
3. 🚧 Rodar no celular: ✅ PWA instalável · ✅ APK Android · ⏳ iOS (requer Mac ou build na nuvem) · ⏳ publicação nas lojas

Funcionalidades planejadas: conversa do grupo, perfil editável, minhas atividades, mapa/localização.

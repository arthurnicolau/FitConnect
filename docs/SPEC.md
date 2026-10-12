# FitConnect: Especificação de regras

Regras de produto definidas na sessão de modelagem de 11/10/2026. Os termos em **negrito** seguem o [GLOSSARY.md](../GLOSSARY.md).

## 1. Cadastro

1.1. O cadastro exige nome, email, senha, cidade, **Nível**, **Gênero** (Masculino, Feminino ou Outro) e **data de nascimento**.
1.2. Nível e Gênero são declarados pela própria pessoa e podem ser alterados no perfil.
1.3. A idade é sempre calculada a partir da data de nascimento.

## 2. Criação de Evento

2.1. Um **Evento** tem título, **Modalidade**, data, horário, local, número de vagas (2 a 50), descrição, **Requisitos** e visibilidade (**público** ou **privado**).
2.2. Ao criar, o **Organizador** indica se vai participar. A opção vem marcada por padrão. Se participar, ele ocupa uma vaga.
2.3. Não é possível criar Evento com início no passado.

## 3. Requisitos

3.1. **Nível**: o Evento define um nível mínimo. Entra quem tem aquele nível ou acima (Iniciante < Intermediário < Avançado).
3.2. **Faixa etária**: o Evento define "Todas" ou um intervalo (18-25, 26-35, 36-45, 46-55, 55+). Entra apenas quem tem idade dentro do intervalo.
3.3. **Gênero**: o Evento é **Aberto a todos**, Só masculino ou Só feminino. Eventos de um gênero aceitam apenas quem declarou exatamente aquele gênero.
3.4. Quem não cumpre todos os Requisitos não pode se inscrever, nem com Convite ou Link de convite.
3.5. Os Requisitos não se aplicam ao Organizador.

## 4. Visibilidade e descoberta

4.1. Cada pessoa vê no feed e na busca apenas **Eventos públicos**, futuros e não cancelados, cujos Requisitos ela cumpre e que estejam dentro do seu **Raio**.
4.2. O Raio é medido a partir da localização atual do aparelho, quando permitida. Ele é ajustável e o padrão é 10 km. Sem localização, valem os Eventos da cidade do cadastro.
4.3. **Eventos privados** nunca aparecem no feed nem na busca.

## 5. Inscrição

5.1. A pessoa se inscreve se cumprir os Requisitos, se o Evento não estiver **lotado** e se ainda não tiver começado.
5.2. Não há lista de espera. A vaga volta a ficar disponível quando há uma **Desistência** ou uma **Remoção**.
5.3. A Desistência é livre até o início do Evento, sem penalidade.
5.4. O Organizador pode remover um Participante antes do início. O removido é avisado e não pode se inscrever de novo naquele Evento.

## 6. Convites

6.1. Em um Evento público, qualquer Participante ou o Organizador pode enviar **Convite** às suas **Conexões**.
6.2. Em um Evento privado, só o Organizador convida, por Convite a Conexões ou pelo **Link de convite**.
6.3. O Organizador pode gerar um novo Link de convite, invalidando o anterior. Quem já está inscrito continua inscrito.
6.4. Convites não reservam vaga e não dispensam Requisitos.

## 7. Ciclo de vida

7.1. O Organizador pode editar data, horário, local e descrição a qualquer momento antes do início, e os Participantes são notificados.
7.2. Com inscritos, os Requisitos não podem ficar mais restritivos e as vagas não podem cair abaixo do número de Participantes.
7.3. O Organizador pode cancelar o Evento até o início. Os Participantes são notificados, e o **Evento cancelado** continua visível para eles, marcado como cancelado.
7.4. Quando o horário de início passa, o Evento passa a ser **realizado** automaticamente. Todos os Participantes daquele momento contam como tendo treinado juntos. Não há confirmação de presença.

## 8. Conversa do grupo

8.1. Cada Evento tem uma **Conversa do grupo**, acessível ao Organizador e aos Participantes atuais.
8.2. Quem desiste ou é removido sai da conversa.
8.3. Após o Evento realizado, a conversa continua aberta. Após o cancelamento, fica só leitura.
8.4. Não existem mensagens diretas entre duas pessoas.

## 9. Conexões

9.1. Duas pessoas que participaram de um mesmo Evento realizado podem trocar um **Pedido de conexão**.
9.2. A **Conexão** só existe depois que o pedido é aceito.

## Fora do escopo por enquanto

- Lista de espera
- Confirmação de presença (check-in)
- Mensagens diretas
- Penalidade por Desistência

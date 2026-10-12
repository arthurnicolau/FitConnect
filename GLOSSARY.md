# FitConnect

App para pessoas encontrarem parceiros para praticar esportes juntas, perto de onde estão.

## Linguagem

### Eventos

**Evento**:
Um encontro para praticar uma Modalidade, com data, horário, local e número limitado de vagas, no qual outras pessoas podem se inscrever.
_Evitar_: Atividade, treino, encontro

**Modalidade**:
O esporte praticado em um Evento, como Corrida, Ciclismo, Yoga ou Natação.
_Evitar_: Tipo, esporte, categoria

**Organizador**:
A pessoa que cria e é responsável por um Evento. Pode ou não praticar no Evento.
_Evitar_: Host, criador, dono

**Participante**:
Pessoa inscrita em um Evento, ocupando uma de suas vagas.
_Evitar_: Inscrito, membro

**Desistência**:
Quando um Participante cancela a própria inscrição antes do início do Evento, liberando a vaga. Não tem penalidade.
_Evitar_: Saída, cancelamento (reservado ao Evento)

**Remoção**:
Quando o Organizador tira um Participante do Evento antes do início. A pessoa é avisada e não pode se inscrever de novo naquele Evento.
_Evitar_: Expulsão, banimento, Desistência

**Evento lotado**:
Evento com todas as vagas ocupadas. Ninguém mais se inscreve até haver uma Desistência; não há lista de espera.
_Evitar_: Esgotado, cheio

**Evento realizado**:
Evento cujo horário de início já passou sem ter sido cancelado. Todos os seus Participantes naquele momento contam como tendo treinado juntos.
_Evitar_: Concluído, finalizado, passado

**Evento cancelado**:
Evento que o Organizador cancelou antes do início. Continua visível para os Participantes, mas sai da busca e do feed.
_Evitar_: Excluído, removido

**Evento público**:
Evento que aparece na busca e no feed de quem cumpre seus Requisitos e está dentro do Raio. Qualquer Participante pode enviar Convites para ele.

**Raio**:
A distância máxima, ajustável pela pessoa, entre onde ela está e os Eventos que lhe são mostrados. Sem a localização atual, vale a cidade do cadastro.
_Evitar_: Distância, alcance, região

**Evento privado**:
Evento que não aparece na busca nem no feed; só é possível chegar a ele por Convite ou Link de convite, ambos enviados pelo Organizador.
_Evitar_: Fechado, secreto

**Convite**:
Aviso enviado a uma Conexão chamando-a para um Evento. Não reserva vaga e não dispensa os Requisitos.
_Evitar_: Chamado, indicação

**Link de convite**:
Endereço de um Evento privado que o Organizador compartilha fora do app para chamar pessoas que ainda não são suas Conexões. Também não dispensa os Requisitos. O Organizador pode trocá-lo por um novo, invalidando o anterior sem afetar quem já se inscreveu.
_Evitar_: Link de acesso, código

### Requisitos

**Requisitos do Evento**:
O conjunto de regras (Nível, Faixa etária e Gênero) que uma pessoa precisa cumprir para se inscrever em um Evento. Não são sugestões: quem não cumpre não entra. Não se aplicam ao Organizador.
_Evitar_: Filtros, preferências, restrições

**Nível**:
O grau de experiência de uma pessoa na prática esportiva: Iniciante, Intermediário ou Avançado. No Evento, é o nível mínimo exigido: entra quem tem aquele nível ou acima.
_Evitar_: Dificuldade, categoria

**Faixa etária**:
O intervalo de idades aceito em um Evento, calculado a partir da data de nascimento de cada pessoa.
_Evitar_: Idade, público

**Gênero**:
Masculino, Feminino ou Outro, declarado pela própria pessoa. Um Evento pode ser Só masculino, Só feminino ou Aberto a todos. Eventos de um só gênero aceitam apenas quem declarou exatamente aquele gênero.

**Aberto a todos**:
Evento sem requisito de gênero.
_Evitar_: Todos, misto

### Social

**Conversa do grupo**:
O espaço de mensagens de um Evento, restrito ao Organizador e aos Participantes atuais (quem desiste sai). Continua aberta após o Evento realizado e fica só leitura se o Evento for cancelado. É a única forma de conversa no app.
_Evitar_: Chat, grupo, mensagem direta

**Conexão**:
Vínculo entre duas pessoas que treinaram juntas no FitConnect, criado quando um Pedido de conexão é aceito.
_Evitar_: Amigo, seguidor

**Pedido de conexão**:
Solicitação de uma pessoa para se conectar com outra com quem já participou de um mesmo Evento. Só vira Conexão quando aceita.
_Evitar_: Convite de amizade, solicitação

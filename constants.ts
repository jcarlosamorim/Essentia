import { StepData } from './types';

export const STEPS: StepData[] = [
  // FASE I: Conexão e Perfil Básico
  {
    id: 1,
    fase: "I",
    titulo: "Rapport e Fundamentação",
    ensina: {
      titulo: "Os 4 Temperamentos",
      explicacao: "A metodologia remonta a Hipócrates e Marston. Não medimos caráter, mas sim COMO a pessoa prefere interagir com o mundo. D e I são ativos (mudam o ambiente); S e C são receptivos (adaptam-se).",
      comoInterpretar: [
        "D (Dominante): Focado em resultados e desafios.",
        "I (Influente): Focado em pessoas e persuasão.",
        "S (Estável): Focado em segurança e paciência.",
        "C (Analítico): Focado em regras e precisão."
      ],
      visualAid: "disc-cards"
    },
    faz: {
      dado: "Validação Inicial",
      valor: "DISC", 
      status: "neutro",
      fale: "Antes de entrarmos nos números, quero validar se esses conceitos fazem sentido. Dentre essas características que expliquei...",
      pergunte: "Você consegue identificar pessoas do seu convívio que representam claramente cada um desses perfis?",
      atencao: "Use as Perguntas de Validação específicas para cada perfil (Ex: 'Conhece a alma da festa?' para I)."
    }
  },
  {
    id: 2,
    fase: "I",
    titulo: "Gráfico em Pizza (Composição)",
    ensina: {
      titulo: "Distribuição de Energia",
      explicacao: "Este gráfico ilustra a proporção exata de cada fator no seu comportamento atual. Ele revela qual 'motor' você usa com mais frequência para resolver problemas.",
      comoInterpretar: [
        "A fatia maior é seu perfil Dominante.",
        "Fatias muito pequenas podem indicar áreas de desconforto.",
        "O equilíbrio perfeito é raro e não necessariamente desejável."
      ],
      visualAid: "pie-chart"
    },
    faz: {
      dado: "Perfil Dominante",
      valor: "DYNAMIC_DOMINANT",
      status: "neutro",
      fale: "Aqui vemos como sua energia está distribuída hoje. O sistema aponta este como seu perfil predominante.",
      pergunte: "Olhando para este gráfico, você concorda com este resultado? Se não, por que?",
      atencao: "Se houver discordância, explore se é uma percepção do Natural ou do Adaptado."
    }
  },
  {
    id: 3,
    fase: "I",
    titulo: "Gráfico em Torres",
    ensina: {
      titulo: "Natural vs. Meio",
      explicacao: "Comparamos quem você É (Natural) com o que o ambiente EXIGE (Adaptado). Visualizamos isso comparando as torres Naturais com as do Meio.",
      comoInterpretar: [
        "Natural > Meio (Redução): O ambiente pede que você 'baixe o volume' desta característica.",
        "Natural < Meio (Aumento): O ambiente pede que você force mais esta característica.",
        "Igualdade: Conforto e fluidez."
      ],
      visualAid: "tower-chart"
    },
    faz: {
      dado: "Ajuste de Comportamento",
      valor: "DYNAMIC_TOWER_ANALYSIS",
      status: "alerta",
      fale: "Observe as diferenças entre as barras. Onde a barra do Meio é maior ou menor que a Natural, existe uma demanda de adaptação.",
      pergunte: "Em qual situação específica você sente que precisa 'aumentar' ou 'diminuir' esse comportamento para sobreviver no seu cargo atual?"
    }
  },

  // FASE II: Diagnóstico de Estresse e Desempenho
  {
    id: 4,
    fase: "II",
    titulo: "Índice A.E.M.",
    ensina: {
      titulo: "Autopercepção da Exigência",
      explicacao: "Este índice (Atividade Externa Média) mede a pressão que você sente para mudar quem você é. É o 'custo energético' de estar onde você está.",
      comoInterpretar: [
        "Alto (>60): Crise/Urgência. 'Preciso mudar quem sou'.",
        "Médio (30-60): Ajuste Tático. 'Preciso melhorar competências'.",
        "Baixo (<30): Congruência. 'Sou adequado ao que faço'."
      ]
    },
    faz: {
      dado: "Nível de Pressão",
      valor: "DYNAMIC_AEM",
      status: "alerta",
      fale: "Este número traduz o nível de ruído interno causado pelas demandas externas.",
      pergunte: "Essa pressão por mudança vem de fatos concretos (metas, chefe) ou de uma cobrança interna sua?",
      atencao: "Investigue sinais de burnout se o índice for muito alto."
    }
  },
  {
    id: 5,
    fase: "II",
    titulo: "Mapa de Autodesempenho",
    ensina: {
      titulo: "A Forma da Competência",
      explicacao: "Visualizamos como você está performando hoje. Não é quem você é, mas sim o comportamento que está entregando.",
      comoInterpretar: [
        "Pontas Longas: Competências exercidas com confiança.",
        "Pontas Curtas: Competências evitadas ou com dificuldade.",
        "Área Total: Ocupação de espaço no ambiente."
      ],
      visualAid: "performance-map"
    },
    faz: {
      dado: "Formato Atual",
      valor: "Adaptado",
      status: "neutro",
      fale: "Imagine que este mapa é a 'roda' que faz sua carreira girar hoje.",
      pergunte: "Como você acha que seu mapa se parece com você? Como você acredita que ele deveria estar para você ter mais sucesso?"
    }
  },
  {
    id: 6,
    fase: "II",
    titulo: "Sobreposição dos Mapas",
    ensina: {
      titulo: "Natural vs. Adaptado",
      explicacao: "Sobrepomos seu estilo Natural (Sólido) com seu estilo Adaptado (Pontilhado). As diferenças revelam os 'Gaps de Energia'.",
      comoInterpretar: [
        "Gap de Retração (Natural maior): Você está se segurando.",
        "Gap de Expansão (Adaptado maior): Você está se forçando.",
        "Sobreposição: Zona de Flow."
      ],
      visualAid: "map-overlay"
    },
    faz: {
      dado: "Gap de Energia",
      valor: "DYNAMIC_GAP",
      status: "alerta",
      fale: "Veja onde as linhas se afastam. Ali está o seu consumo de bateria mental.",
      pergunte: "Olhando para onde você teve que expandir: qual área da vida exige isso? E onde teve que retrair: o que acontecia na época da pesquisa para você querer diminuir isso?",
      atencao: "Questione: 'Como foi querer mudar o que você é? Leve ou pesado?'"
    }
  },
  {
    id: 7,
    fase: "II",
    titulo: "Índice A.P.F.",
    ensina: {
      titulo: "Aproveitamento Pessoal",
      explicacao: "O A.P.F. (Atividade Pessoal Física) mede o quanto você sente que suas habilidades naturais estão sendo usadas na prática. É a 'tração' na carreira.",
      comoInterpretar: [
        "Baixo (<30): Subutilização, tédio ou desmotivação.",
        "Alto (>70): Realização e utilidade.",
        "Médio: Rotina operacional."
      ]
    },
    faz: {
      dado: "Nível de Tração",
      valor: "DYNAMIC_APF",
      status: "positivo",
      fale: "Este número indica se você termina o dia com a sensação de 'dever cumprido' ou de 'potencial desperdiçado'.",
      pergunte: "Você sente que seu cargo atual permite que você use o melhor que tem a oferecer?"
    }
  },

  // FASE III: Identidade, Autoestima e Autocrítica
  {
    id: 8,
    fase: "III",
    titulo: "Motivadores de Carreira",
    ensina: {
      titulo: "Âncoras de Carreira",
      explicacao: "Identificamos o que realmente move você profissionalmente. São valores inegociáveis que, quando atendidos, geram satisfação profunda.",
      comoInterpretar: [
        "Âncoras no topo são essenciais.",
        "Âncoras na base são irrelevantes para motivação.",
        "Conflitos surgem quando o trabalho fere uma âncora do topo."
      ],
      visualAid: "anchors-list"
    },
    faz: {
      dado: "Âncoras Principais",
      valor: "DYNAMIC_ANCHORS",
      status: "neutro",
      fale: "Estas são as prioridades que seu inconsciente definiu para sua carreira.",
      pergunte: "Estes motivadores estão sendo atendidos no seu dia a dia hoje, ou estão sendo ignorados?",
      atencao: "A falta de alinhamento aqui é a maior causa de turnover voluntário."
    }
  },
  {
    id: 9,
    fase: "III",
    titulo: "Índice I.P.S.",
    ensina: {
      titulo: "Positividade Seletiva",
      explicacao: "Mede a autoestima e o valor que você atribui aos seus próprios resultados. O ideal é que esteja acima de 85%.",
      comoInterpretar: [
        "Baixo: Autodesvalorização, síndrome do impostor.",
        "Alto: Confiança e valorização da entrega.",
        "Relação com Resultados: Se baixo, os resultados eram ruins ou a régua estava alta demais?"
      ]
    },
    faz: {
      dado: "Autoestima Profissional",
      valor: "DYNAMIC_IPS",
      status: "alerta",
      fale: "Este índice reflete como você avalia sua própria entrega de valor.",
      pergunte: "Na época que respondeu a pesquisa, você estava tendo os resultados esperados? Como você se sentia em relação a eles?"
    }
  },
  {
    id: 10,
    fase: "III",
    titulo: "Índice I.D.A.",
    ensina: {
      titulo: "Discrepância de Autopercepção",
      explicacao: "Compara sua clareza sobre quem é (Fase I) com o estresse da mudança (Fase II). Indica autoconhecimento versus confusão.",
      comoInterpretar: [
        "Alto: Estresse mental, dúvida sobre a própria capacidade ('Sei, mas não consigo').",
        "Baixo: Congruência e clareza."
      ]
    },
    faz: {
      dado: "Nível de Clareza",
      valor: "DYNAMIC_IDA",
      status: "neutro",
      fale: "Analisamos aqui se existe um conflito entre o que você sabe que pode fazer e o que consegue executar.",
      pergunte: "Você sente que conhece suas habilidades, mas na hora de colocar em prática algo te bloqueia?"
    }
  },
  {
    id: 11,
    fase: "III",
    titulo: "Forças x Limitantes",
    ensina: {
      titulo: "Autoestima vs. Autocrítica",
      explicacao: "Analisamos a proporção de qualidades versus defeitos que você se atribuiu.",
      comoInterpretar: [
        "Pontos Fortes < 55%: Indício de Baixa Autoestima.",
        "Pontos Limitantes > 30%: Indício de Alta Autocrítica.",
        "Equilíbrio é fundamental."
      ],
      visualAid: "comparison-table"
    },
    faz: {
      dado: "Balanço Interno",
      valor: "DYNAMIC_BALANCE",
      status: "alerta",
      fale: "Aqui vemos o quanto você foca no que tem de bom versus o quanto foca no que falta.",
      pergunte: "Como você se sente em relação a este perfil onde seus pontos fortes apareceram menos? Você tende a ser muito duro consigo mesmo nesta área?"
    }
  },
  {
    id: 12,
    fase: "III",
    titulo: "Índice I.P.M.",
    ensina: {
      titulo: "Pontos de Melhoria",
      explicacao: "Mede a intensidade da sua autocobrança para mudar (eliminar defeitos ou adquirir qualidades).",
      comoInterpretar: [
        "Muito Alto: Perfeccionismo paralisante.",
        "Normal: Desejo saudável de evolução.",
        "Baixo/Nulo: Zona de conforto ou falta de autocrítica."
      ]
    },
    faz: {
      dado: "Nível de Autocobrança",
      valor: "DYNAMIC_IPM",
      status: "alerta",
      fale: "Este número nos diz o quanto você está 'brigando' consigo mesmo para ser diferente.",
      pergunte: "Você sente que essa necessidade de melhoria vem de um desejo genuíno de crescer ou de um sentimento de inadequação?"
    }
  },

  // FASE IV: Transformação e Encerramento
  {
    id: 13,
    fase: "IV",
    titulo: "Foco de Evolução",
    ensina: {
      titulo: "O Poder do Um",
      explicacao: "Para garantir mudança real, precisamos de foco laser. Tentar melhorar tudo ao mesmo tempo resulta em não melhorar nada.",
      comoInterpretar: [
        "Escolha APENAS UM ponto da lista.",
        "Deve ser algo acionável na próxima semana.",
        "Deve ter alto impacto no alívio de estresse."
      ]
    },
    faz: {
      dado: "Seleção Única",
      valor: "INTERACTIVE_SELECTION",
      status: "alerta",
      fale: "Aqui está sua lista de pontos de melhoria mapeados. Quero que você escolha apenas UM para focar esta semana.",
      pergunte: "Qual destes itens, se resolvido, traria mais alívio imediato para sua rotina?"
    }
  },
  {
    id: 14,
    fase: "IV",
    titulo: "Plano S.M.A.R.T.",
    ensina: {
      titulo: "Arquitetura da Ação",
      explicacao: "Transformamos a intenção em compromisso através da metodologia S.M.A.R.T.",
      comoInterpretar: [
        "Específico: O que exatamente?",
        "Mensurável: Como saber que acabou?",
        "Atingível: É viável agora?",
        "Relevante: Por que importa?",
        "Temporal: Quando (Dia/Hora)?"
      ],
      visualAid: "smart-diagram"
    },
    faz: {
      dado: "Compromisso",
      valor: "INTERACTIVE_SMART",
      status: "positivo",
      fale: "Vamos operacionalizar sua escolha. Que passo concreto você pode dar?",
      pergunte: "Como você vai comemorar quando cumprir essa tarefa? A celebração fixa o hábito.",
      atencao: "Garanta que a tarefa tenha data e hora marcadas."
    }
  },
  {
    id: 15,
    fase: "IV",
    titulo: "Fechamento",
    ensina: {
      titulo: "Ancoragem Final",
      explicacao: "O processo só termina quando o cliente verbaliza o valor. Isso transfere a responsabilidade (Ownership) e consolida o aprendizado.",
      comoInterpretar: [
        "Escuta ativa.",
        "Validação final.",
        "Reforço da capacidade de mudança."
      ]
    },
    faz: {
      dado: "Feedback",
      valor: "INTERACTIVE_CLOSING",
      status: "neutro",
      fale: "Chegamos ao fim da nossa jornada de hoje.",
      pergunte: "Por que valeu a pena receber esta Devolutiva de Identidade hoje?",
      atencao: "Não aceite respostas monossilábicas. Peça para elaborar."
    }
  }
];

export const getStepData = (screenIndex: number): StepData => {
  const stepIndex = screenIndex - 2;
  if (stepIndex >= STEPS.length) {
      return STEPS[STEPS.length - 1];
  }
  if (stepIndex < 0) return STEPS[0];
  return STEPS[stepIndex];
};
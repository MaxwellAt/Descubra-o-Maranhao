const axios = require('axios');

const destinos = [
    {
        "nome": "Centro Histórico de São Luís",
        "descricao": "Patrimônio Mundial da UNESCO, com arquitetura colonial portuguesa.",
        "latitude": -2.5297,
        "longitude": -44.3028,
        "imagem_url": "https://www.voltologo.net/wp-content/uploads/2023/02/centro-historico-de-sao-luis-dicas.jpg.webp",
        "regiao": "Norte",
        "atrativos": [
            {
                "nome": "Palácio dos Leões",
                "descricao": "Sede do governo do Maranhão, com uma vista incrível da Baía de São Marcos.",
                "dicas": ["Faça uma visita guiada para aprender mais sobre a história do local.", "Visite o palácio ao entardecer para uma vista deslumbrante."],
                "tipo": "Edifício Histórico"
            },
            {
                "nome": "Teatro Arthur Azevedo",
                "descricao": "Um dos teatros mais antigos do Brasil, com uma rica programação cultural.",
                "dicas": ["Verifique a programação e compre ingressos com antecedência.", "Aproveite para conhecer a arquitetura interna do teatro."],
                "tipo": "Teatro"
            }
        ]
    },
    {
        "nome": "Lençóis Maranhenses",
        "descricao": "Um dos destinos mais incríveis do Brasil, com dunas e lagoas de água doce.",
        "latitude": -2.4825,
        "longitude": -43.1167,
        "imagem_url": "https://s2-g1.glbimg.com/gphrDPusszqyUs7oRrlReKxaebc=/0x0:3000x2000/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/U/H/4vfxZSQ5WiUTMY3EynOg/maranhao-celso-tavares-g1-132-.jpg",
        "regiao": "Norte",
        "atrativos": [
            {
                "nome": "Lagoa Bonita",
                "descricao": "Uma das lagoas mais bonitas dos Lençóis Maranhenses, com águas cristalinas e areia branca.",
                "dicas": ["Visite durante a estação chuvosa para ver a lagoa cheia.", "Leve protetor solar e água."],
                "tipo": "Lagoa"
            },
            {
                "nome": "Lagoa Azul",
                "descricao": "Outra lagoa famosa, conhecida por suas águas de um azul intenso.",
                "dicas": ["Aproveite para nadar nas águas cristalinas.", "Leve uma câmera para capturar a beleza do lugar."],
                "tipo": "Lagoa"
            }
        ]
    },
    {
        "nome": "Alcântara",
        "descricao": "Cidade histórica com ruínas e casarões coloniais.",
        "latitude": -2.4067,
        "longitude": -44.4153,
        "imagem_url": "https://upload.wikimedia.org/wikipedia/commons/1/18/Alc%C3%A2ntara_-_01.jpg",
        "regiao": "Norte",
        "atrativos": [
            {
                "nome": "Igreja de São Matias",
                "descricao": "Uma das igrejas mais antigas de Alcântara, com arquitetura colonial.",
                "dicas": ["Visite durante o pôr do sol para uma experiência inesquecível.", "Leve uma câmera para capturar a beleza arquitetônica."],
                "tipo": "Igreja"
            },
            {
                "nome": "Museu Histórico de Alcântara",
                "descricao": "Museu que conta a história da cidade e da região.",
                "dicas": ["Reserve tempo para explorar todas as exposições.", "Aproveite para aprender sobre a história local."],
                "tipo": "Museu"
            }
        ]
    },
    {
        "nome": "Chapada das Mesas",
        "descricao": "Um paraíso para os amantes da natureza, com cachoeiras, cânions e formações rochosas impressionantes.",
        "latitude": -7.3201,
        "longitude": -47.4692,
        "imagem_url": "https://r5j2d2t3.rocketcdn.me/wp-content/uploads/2019/09/chapada-das-mesas-maranhao-023.jpg",
        "regiao": "Sul",
        "atrativos": [
            {
                "nome": "Cachoeira de São Romão",
                "descricao": "Uma das maiores cachoeiras da região, com uma queda d'água impressionante.",
                "dicas": ["Leve roupa de banho e aproveite para nadar nas águas refrescantes."],
                "tipo": "Cachoeira"
            },
            {
                "nome": "Cachoeira da Prata",
                "descricao": "Uma bela cachoeira com águas cristalinas, perfeita para um dia de lazer.",
                "dicas": ["Visite durante a manhã para evitar multidões."],
                "tipo": "Cachoeira"
            }
        ]
    },
    {
        "nome": "Barreirinhas",
        "descricao": "Porta de entrada para os Lençóis Maranhenses, com belas paisagens e passeios de barco pelo Rio Preguiças.",
        "latitude": -2.7556,
        "longitude": -42.8236,
        "imagem_url": "https://mediaim.expedia.com/destination/1/755c0a7d382ba67a2e2847439a0458c7.jpg",
        "regiao": "Norte",
        "atrativos": [
            {
                "nome": "Rio Preguiças",
                "descricao": "Um rio sereno que oferece passeios de barco inesquecíveis.",
                "dicas": ["Faça um passeio de barco ao pôr do sol para uma experiência mágica."],
                "tipo": "Rio"
            },
            {
                "nome": "Pequenos Lençóis",
                "descricao": "Dunas menores, mas igualmente belas, que oferecem uma prévia dos Lençóis Maranhenses.",
                "dicas": ["Leve protetor solar e água para a caminhada."],
                "tipo": "Dunas"
            }
        ]
    },
    {
        "nome": "Santo Amaro",
        "descricao": "Conhecida como o 'paraíso perdido dos Lençóis', com lagoas menos movimentadas e paisagens deslumbrantes.",
        "latitude": -2.5000,
        "longitude": -43.2389,
        "imagem_url": "https://enjoymaranhao.com.br/wp-content/uploads/2023/01/CHP4802-768x512.jpg",
        "regiao": "Norte",
        "atrativos": [
            {
                "nome": "Lagoa das Cabras",
                "descricao": "Uma lagoa tranquila e pouco frequentada, perfeita para relaxar.",
                "dicas": ["Visite durante a estação chuvosa para ver a lagoa cheia."],
                "tipo": "Lagoa"
            },
            {
                "nome": "Lagoa das Andorinhas",
                "descricao": "Uma lagoa encantadora, ideal para um dia de lazer.",
                "dicas": ["Leve uma câmera para capturar a beleza do lugar."],
                "tipo": "Lagoa"
            }
        ]
    }
];

const insertDestinos = async () => {
    for (const destino of destinos) {
        try {
            const response = await axios.post('http://localhost:3000/destinos', destino);
            console.log(`Destino ${destino.nome} inserido com sucesso:`, response.data);
        } catch (error) {
            console.error(`Erro ao inserir destino ${destino.nome}:`, error.response ? error.response.data : error.message);
        }
    }
};

insertDestinos();
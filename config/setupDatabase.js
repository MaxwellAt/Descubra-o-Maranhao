const mysql = require('mysql');
require('dotenv').config();

// Cria a conexão com o MySQL sem especificar o banco de dados
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');

    // Verifica se o banco de dados existe
    connection.query(`SHOW DATABASES LIKE ?`, [process.env.DB_NAME], (err, results) => {
        if (err) {
            console.error('Erro ao verificar banco de dados:', err);
            connection.end();
            return;
        }

        if (results.length === 0) {
            console.log(`Banco de dados ${process.env.DB_NAME} não existe. Criando...`);
            // Cria o banco de dados se não existir
            connection.query(`CREATE DATABASE ${process.env.DB_NAME}`, (err) => {
                if (err) {
                    console.error('Erro ao criar banco de dados:', err);
                    connection.end();
                    return;
                }
                console.log(`Banco de dados ${process.env.DB_NAME} criado`);
                // Muda para o banco de dados recém-criado
                connection.changeUser({ database: process.env.DB_NAME }, (err) => {
                    if (err) {
                        console.error('Erro ao mudar para o banco de dados:', err);
                        connection.end();
                        return;
                    }
                    console.log(`Mudou para o banco de dados ${process.env.DB_NAME}`);
                    createTables();
                });
            });
        } else {
            console.log(`Banco de dados ${process.env.DB_NAME} já existe. Verificando tabelas...`);
            // Muda para o banco de dados existente
            connection.changeUser({ database: process.env.DB_NAME }, (err) => {
                if (err) {
                    console.error('Erro ao mudar para o banco de dados:', err);
                    connection.end();
                    return;
                }
                console.log(`Mudou para o banco de dados ${process.env.DB_NAME}`);
                createTables();
            });
        }
    });
});

function createTables() {
    const tableQueries = [
        `CREATE TABLE IF NOT EXISTS destinos (
            id INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL,
            descricao TEXT NOT NULL,
            latitude DECIMAL(10,8) NOT NULL,
            longitude DECIMAL(11,8) NOT NULL,
            imagem_link VARCHAR(255) NOT NULL,
            região VARCHAR(255) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX nome_UNIQUE (nome ASC),
            UNIQUE INDEX latitude_UNIQUE (latitude ASC),
            UNIQUE INDEX longitude_UNIQUE (longitude ASC),
            UNIQUE INDEX id_UNIQUE (id ASC)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,

        `CREATE TABLE IF NOT EXISTS usuarios (
            id INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            senha_hash VARCHAR(255) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY email_UNIQUE (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,

        `CREATE TABLE IF NOT EXISTS atrativos (
            id INT NOT NULL AUTO_INCREMENT,
            destino_id INT DEFAULT NULL,
            nome VARCHAR(255) DEFAULT NULL,
            tipo VARCHAR(50) DEFAULT NULL,
            descricao TEXT,
            dicas JSON DEFAULT NULL,
            PRIMARY KEY (id),
            KEY destino_id (destino_id),
            CONSTRAINT atrativos_ibfk_1 FOREIGN KEY (destino_id) REFERENCES destinos (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`
    ];

    // Executa cada query de criação de tabela separadamente
    let i = 0;
    function executeNextQuery() {
        if (i >= tableQueries.length) {
            console.log('Tabelas verificadas/criadas');
            connection.end();
            return;
        }
        connection.query(tableQueries[i], (err) => {
            if (err) {
                console.error('Erro ao criar tabela:', err);
                connection.end();
                return;
            }
            i++;
            executeNextQuery();
        });
    }
    executeNextQuery();
}

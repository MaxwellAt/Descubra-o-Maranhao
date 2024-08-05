const db = require('../config/db');

exports.getAllAtrativos = (req, res) => {
    const query = 'SELECT * FROM atrativos';
    db.query(query, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results);
    });
};

exports.getAtrativoById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM atrativos WHERE id = ?';
    db.query(query, [id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results[0]);
    });
};

exports.createAtrativo = (req, res) => {
    const { nome, descricao, dicas, tipo, destino_id } = req.body;
    const dicasJson = JSON.stringify(dicas); // Convertendo a lista de dicas para JSON
    const sql = 'INSERT INTO atrativos (nome, descricao, dicas, tipo, destino_id) VALUES (?, ?, ?, ?, ?)';
    

    db.query(sql, [nome, descricao, dicasJson, tipo, destino_id], (err, result) => {
        if (err) return res.status(500).json({ "Erro no:":"createAtrativo", error: err.message });
        res.json({ message: 'Atrativo criado com sucesso', id: result.insertId });
    });
};


exports.deleteAllAtrativos = (req, res) => {
    const sql = 'DELETE FROM atrativos';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Todos os atrativos foram deletados' });
    });
};
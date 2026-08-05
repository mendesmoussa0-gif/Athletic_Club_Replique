<?php
/**
 * Cria a tabela `membros` no banco de dados definido em conexao.php.
 * Execute este arquivo uma vez para inicializar a tabela.
 */

require_once __DIR__ . '/conexao.php';

$sql = <<<SQL
CREATE TABLE IF NOT EXISTS membros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(50) DEFAULT NULL,
    categoria VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
SQL;

try {
    $pdo->exec($sql);
    echo "Tabela 'membros' criada com sucesso (ou já existe).";
} catch (PDOException $e) {
    echo "Erro ao criar tabela: " . $e->getMessage();
}

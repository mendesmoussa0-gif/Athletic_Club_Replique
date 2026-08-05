<?php
/**
 * CRUD de membros da academia usando PDO.
 * Arquivo de suporte para criar, ler, atualizar e excluir registros.
 *
 * Antes de usar, crie a tabela no banco de dados:
 *
 * CREATE TABLE membros (
 *   id INT AUTO_INCREMENT PRIMARY KEY,
 *   nome VARCHAR(150) NOT NULL,
 *   email VARCHAR(150) NOT NULL,
 *   telefone VARCHAR(50) DEFAULT NULL,
 *   categoria VARCHAR(100) DEFAULT NULL,
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexao.php';

$action = $_GET['action'] ?? $_POST['action'] ?? 'list';

function respond($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function getInput($key, $default = null) {
    return $_POST[$key] ?? $default;
}

try {
    switch ($action) {
        case 'create':
            $nome = trim(getInput('nome', ''));
            $email = trim(getInput('email', ''));
            $telefone = trim(getInput('telefone', ''));
            $categoria = trim(getInput('categoria', ''));

            if ($nome === '' || $email === '') {
                respond(['error' => 'Nome e email são obrigatórios.'], 400);
            }

            $stmt = $pdo->prepare('INSERT INTO membros (nome, email, telefone, categoria) VALUES (:nome, :email, :telefone, :categoria)');
            $stmt->execute([
                ':nome' => $nome,
                ':email' => $email,
                ':telefone' => $telefone ?: null,
                ':categoria' => $categoria ?: null,
            ]);

            respond(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;

        case 'read':
            $id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT);
            if (!$id) {
                respond(['error' => 'ID inválido.'], 400);
            }
            $stmt = $pdo->prepare('SELECT * FROM membros WHERE id = :id');
            $stmt->execute([':id' => $id]);
            $membro = $stmt->fetch();
            if (!$membro) {
                respond(['error' => 'Registro não encontrado.'], 404);
            }
            respond(['success' => true, 'data' => $membro]);
            break;

        case 'update':
            $id = filter_var(getInput('id'), FILTER_VALIDATE_INT);
            $nome = trim(getInput('nome', ''));
            $email = trim(getInput('email', ''));
            $telefone = trim(getInput('telefone', ''));
            $categoria = trim(getInput('categoria', ''));

            if (!$id || $nome === '' || $email === '') {
                respond(['error' => 'ID, nome e email são obrigatórios.'], 400);
            }

            $stmt = $pdo->prepare('UPDATE membros SET nome = :nome, email = :email, telefone = :telefone, categoria = :categoria WHERE id = :id');
            $stmt->execute([
                ':nome' => $nome,
                ':email' => $email,
                ':telefone' => $telefone ?: null,
                ':categoria' => $categoria ?: null,
                ':id' => $id,
            ]);

            respond(['success' => true, 'updated' => $stmt->rowCount()]);
            break;

        case 'delete':
            $id = filter_var(getInput('id'), FILTER_VALIDATE_INT);
            if (!$id) {
                respond(['error' => 'ID inválido.'], 400);
            }
            $stmt = $pdo->prepare('DELETE FROM membros WHERE id = :id');
            $stmt->execute([':id' => $id]);
            respond(['success' => true, 'deleted' => $stmt->rowCount()]);
            break;

        case 'list':
        default:
            $stmt = $pdo->query('SELECT * FROM membros ORDER BY id DESC');
            $membros = $stmt->fetchAll();
            respond(['success' => true, 'data' => $membros]);
            break;
    }
} catch (PDOException $e) {
    respond(['error' => 'Erro no banco de dados: ' . $e->getMessage()], 500);
}

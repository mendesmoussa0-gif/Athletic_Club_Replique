<?php
require_once __DIR__ . '/conexao.php';

$nome = $email = $telefone = $categoria = ''; 
$success = null;
$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim($_POST['nome'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $telefone = trim($_POST['telefone'] ?? '');
    $categoria = trim($_POST['categoria'] ?? '');

    if ($nome === '' || $email === '') {
        $error = 'Por favor, preencha o nome e o email.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Por favor, informe um email válido.';
    } else {
        try {
            $stmt = $pdo->prepare('INSERT INTO membros (nome, email, telefone, categoria) VALUES (:nome, :email, :telefone, :categoria)');
            $stmt->execute([
                ':nome' => $nome,
                ':email' => $email,
                ':telefone' => $telefone ?: null,
                ':categoria' => $categoria ?: null,
            ]);
            $success = 'Cadastro realizado com sucesso! Obrigado por se inscrever.';
            $nome = $email = $telefone = $categoria = '';
        } catch (PDOException $e) {
            $error = 'Erro ao salvar cadastro: ' . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - Athletic Club Replique</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header class="header">
        <nav class="navbar">
            <div class="logo">
                <i class="fas fa-futbol">Athletic Club Replique</i> <span>Acadêmia</span>
            </div>
            <ul class="nav-links">
                <li><a href="index.html">Accueil</a></li>
                <li><a href="index.html#sobre">À Propos</a></li>
                <li><a href="index.html#servicos">Services</a></li>
                <li><a href="index.html#contato">Contact</a></li>
                <li><a href="cadastro.php">Cadastro</a></li>
                <li><a href="galeria.html">Galerie</a></li>
            </ul>
            <button class="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    </header>

    <section class="sobre" style="padding: 80px 0;">
        <div class="container">
            <h2>Cadastro de Membros</h2>
            <div class="sobre-content" style="grid-template-columns: 1fr; gap: 2rem;">
                <div class="sobre-text">
                    <p>Preencha o formulário abaixo para se inscrever em nossa academia. Todos são bem-vindos, de iniciantes a atletas experientes.</p>
                    <?php if ($success): ?>
                        <div style="padding: 16px; background: #e8f5e9; border: 1px solid #a5d6a7; color: #2e7d32; border-radius: 6px; margin-bottom: 1.5rem;">
                            <?= htmlspecialchars($success, ENT_QUOTES, 'UTF-8') ?>
                        </div>
                    <?php endif; ?>
                    <?php if ($error): ?>
                        <div style="padding: 16px; background: #ffebee; border: 1px solid #ef9a9a; color: #c62828; border-radius: 6px; margin-bottom: 1.5rem;">
                            <?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?>
                        </div>
                    <?php endif; ?>
                </div>

                <form class="contato-form" method="post" action="cadastro.php">
                    <div class="form-group">
                        <label for="nome">Nome completo</label>
                        <input id="nome" name="nome" type="text" value="<?= htmlspecialchars($nome, ENT_QUOTES, 'UTF-8') ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" name="email" type="email" value="<?= htmlspecialchars($email, ENT_QUOTES, 'UTF-8') ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="telefone">Telefone</label>
                        <input id="telefone" name="telefone" type="tel" value="<?= htmlspecialchars($telefone, ENT_QUOTES, 'UTF-8') ?>">
                    </div>
                    <div class="form-group">
                        <label for="categoria">Categoria preferida</label>
                        <select id="categoria" name="categoria">
                            <option value="" <?= $categoria === '' ? 'selected' : '' ?>>Selecione</option>
                            <option value="Iniciação" <?= $categoria === 'Iniciação' ? 'selected' : '' ?>>Iniciação</option>
                            <option value="Infantil" <?= $categoria === 'Infantil' ? 'selected' : '' ?>>Infantil</option>
                            <option value="Juvenil" <?= $categoria === 'Juvenil' ? 'selected' : '' ?>>Juvenil</option>
                            <option value="Adulto" <?= $categoria === 'Adulto' ? 'selected' : '' ?>>Adulto</option>
                        </select>
                    </div>
                    <button class="btn-enviar" type="submit">Enviar Cadastro</button>
                </form>
            </div>
        </div>
    </section>

    <script src="script.js"></script>
</body>
</html>

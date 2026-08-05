<?php
/**
 * Conexão com o Banco de Dados MySQL / MariaDB via PDO
 * Academia de Futebol - ATHLETIC CLUB REPLIQUE
 */

$host     = 'localhost';
$db       = 'AC_Replique_DB';
$user     = 'root';
$password = ''; // Coloque a sua senha do MySQL aqui se houver
$charset  = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $password, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>
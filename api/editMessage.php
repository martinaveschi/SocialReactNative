<?php
require_once 'DbConnector.php';
require_once 'TokenManager.php';
$headers = getallheaders();
foreach ($headers as $name => $value) {}
$authorization = $_SERVER['HTTP_AUTHORIZATION'];
if(isset($authorization)) {
    $post = json_decode(file_get_contents('php://input'), true);
    $parts = explode(' ', $authorization);
    $token = ($parts[1]);
    $tokenManager = new TokenManager();
    $connection = new DbConnector('localhost', 'root', 'root', 'itsumbria_coding');
    $statement = $connection->prepare('
    UPDATE posts
    SET content = :content
    WHERE id = :id
    ');
    $statement->bindParam(':content', $post['content']);
    $statement->bindParam(':id', $post['postId']);
    $statement->execute();
}

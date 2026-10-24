<?php

require_once "DbConnector.php";
$errorCode = null;
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $post = json_decode(file_get_contents('php://input'), true);
    if (array_key_exists('username', $post) && array_key_exists('password', $post) && array_key_exists('password-confirmation', $post)) {
        if (strlen($post['username']) == 0 || strlen($post['password']) == 0 || strlen($post['password-confirmation']) == 0) {
            $errorCode = '1';
        }
        if ($post['password'] != $post['password-confirmation']) {
            $errorCode = '2';
        }
        if (!$errorCode) {
            $connection = new DbConnector('localhost', 'root', 'root', 'itsumbria_coding');
            $statement = $connection->prepare('
            SELECT username
            FROM users
            WHERE users.username = :username
            ');
            $statement->bindParam(':username', $post['username']);
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
                if (!empty($result)) {
                    $errorCode = '3';
                }
        }
        if(!$errorCode) {
            $pwdHash = password_hash($post['password'], PASSWORD_BCRYPT);
            $connection = new DbConnector('localhost', 'root', 'root', 'itsumbria_coding');
            $statement = $connection->prepare('
                INSERT INTO users (username, password) values (:username, :password)');
            $statement->bindParam(':username', $post['username']);
            $statement->bindParam(':password', $pwdHash);
            $statement->execute();
        }
    }

}
?>
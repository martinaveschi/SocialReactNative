<?php

require_once 'DbConnector.php';
require_once 'TokenManager.php';

echo print_r($_SERVER, true);
$errorCode = null;
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $post = json_decode(file_get_contents('php://input'), true);
//
    if(array_key_exists('username', $post) && strlen($post['username']) == 0){
        $errorCode = '1';
    }
    if(array_key_exists('password', $post) && strlen($post['password']) == 0) {
        $errorCode = '2';
    }
    if(!$errorCode) {

            $username = $post['username'];
            $password = $post['password'];
            $connection = new DbConnector('localhost', 'root', 'root', 'itsumbria_coding');
            $statement = $connection->prepare('
                    SELECT id, username, password, role
                    FROM users
                    WHERE username = :username
                    ');
            $statement->bindParam(':username', $username);
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            if(empty($result)) {
                $errorCode = '3';
            } else {
//                $hash = $result['password'];
                if(password_verify($post['password'], $result['password'])) {
                    $tokenManager = new TokenManager();
                    echo json_encode([
                        'token' => $tokenManager->generate($result['id']),
                    ]);
                } else {
                    $errorCode = '4';
                }
            }
    }
//
//        }
     if(null !== $errorCode) {
        echo json_encode([
            'error' => 'Username o password non validi',
            'code' => $errorCode
        ]);
     }
}
?>
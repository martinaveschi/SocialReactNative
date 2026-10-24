<?php
require_once 'DbConnector.php';
require_once 'TokenManager.php';
//echo print_r($_SERVER);
//estrarre, leggere header dalla richiesta
$errorToken = null;
$headers = getallheaders();
foreach ($headers as $name => $value) {
    //echo "$name: $value\n";
}
//cercare header authorization
$authorization = $_SERVER['HTTP_AUTHORIZATION'];
//echo "Authorization: $authorization";
//se esiste authorization, estrarre il token
if(isset($authorization)) {
    $parts = explode(' ', $authorization);
    $token = ($parts[1]);
    //validare il token
    $tokenManager = new TokenManager();
    if(!$tokenManager->validate($token)) {

        echo json_encode([
            'error' => 'Token non valido.',
            'code' => 401
        ]);
        return;
    }
    $connection = new DbConnector('localhost', 'root', 'root', 'itsumbria_coding');
    $limit = 10;
    $offset = 0;
    if(array_key_exists('page', $_GET)){
        $page = $_GET['page'] ? : 1;
        $offset = ($page - 1) * $limit;
    }
    $statement = $connection->prepare("
    SELECT posts.id, users.username, posts.content, posts.creation_date
    FROM posts
    JOIN users
    ON posts.user_id = users.id
    WHERE deletion_date is NULL
    ORDER BY creation_date DESC
    LIMIT :limit OFFSET :offset
    ");
    $statement->bindParam(':limit', $limit, PDO::PARAM_INT);
    $statement->bindParam(':offset', $offset, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    $count = $connection->prepare('SELECT COUNT(*) FROM posts WHERE deletion_date is NULL');
    $count->execute();
    $totalrows = $count->fetchColumn();
    $totalpages = ceil($totalrows / $limit);
    echo json_encode([
            'items' => $result,
            'pagination' => [
                    'totalrows' => $totalrows,
                    'totalpages' => $totalpages,
                    'currentpage' => $page
            ]
    ], JSON_PRETTY_PRINT );
} else {
    //se token non è valido, restituire un json di errore
    echo json_encode([
            'error' => 'Token non valido.',
            'code' => $errorToken
    ]);
}
//if (empty($_SESSION)) {
//    header('Location: login.php');
//}


//$count = $connection->prepare('SELECT COUNT(*) FROM posts WHERE deletion_date is NULL');
//$count->execute();
//$totalrows = $count->fetchColumn();
//$totalpages = ceil($totalrows / $limit);
//paginacorrente
//echo json_encode([
//        'items' => $result,
//        'totalrows' => $totalrows,
//        'totalpages' => $totalpages
//]);

//if (!array_key_exists('signature', $_SESSION)) {
//    $signature = rand(0, 9999);
//    $_SESSION['signature'] = md5($signature);
//}
//if(isset($_POST['logout'])){
//    session_unset();
//    session_destroy();
//    header('Location: login.php');
//    exit;
//}

//QUERY PER OTTENERE L'UTENTE AUTENTICATO
//$statement = $connection->prepare('
//    SELECT username FROM users WHERE id = :id
//');
//$statement->bindParam(':id', $_SESSION['user_id']);
//$statement->execute();
//$currentUser = $statement->fetch(PDO::FETCH_ASSOC);

?>
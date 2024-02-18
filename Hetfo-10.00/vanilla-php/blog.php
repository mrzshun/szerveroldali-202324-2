<?php
    // Feladat: írjunk egy blog listázófelületet, amely az imént generált JSON alapján
    // Amennyiben nincs megadva blogpost id, akkor kiolvassa a blogposztokat, és kilistázza azokat cím, szerző formában és egy részletek gombbal
    // Amennyiben meg van adva egy blogpost id, úgy azt az egy blogposztot írjuk ki az összes részletével

    
    require_once 'vendor/autoload.php';
    $filename = './data/blogposts.json';
    if(file_exists($filename)) {
        $file = true;
        $blogposts = json_decode(file_get_contents($filename,true),true);
        $postById = null;
        if(isset($_GET['id'])) {
            $idToFind = $_GET['id'];
            foreach($blogposts as $post) {
                if($post['id'] == $idToFind) {
                    $postById = $post;
                }
            }
        }
    }
    else {
        $file = false;

    }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>1. Feladat - nevek generálása</title>
  </head>
  <body>
    <?php if(!$file):?>
        <h1>Cannot load blogposts</h1>
    <?php else: ?>
        <?php if($postById === null): ?>
            <h1>All blogposts:</h1>
            <?php foreach($blogposts as $post): ?>
                <h2><?php echo $post['title'] ?></h2>
                <p><?php echo $post['author'] ?></p>
                <p><a href="./blog.php?id=<?php echo $post['id'] ?>">details</a></p>
            <?php endforeach; ?>
        <?php else: ?>
            <h1>The requested blogpost:</h1>
            <h2><?php echo $postById['title'] ?></h2>
            <p><?php echo $postById['author'] ?></p>
            <p><?php echo $postById['text'] ?></p>
            <p><a href="./blog.php">back</a></p>
        <?php endif; ?>
    <?php endif; ?>
  </body>
</html>
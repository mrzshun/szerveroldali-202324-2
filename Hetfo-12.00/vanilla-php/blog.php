<?php

    // Feladat: írjunk egy blog felületet, ami az imént generált JSON-ból kiolvassa a blogposztokat
    // amennyiben az url-ben get paraméterként adott egy blogposzt id, akkor azt a blogposztot kiírja
    // amennyiben pedig ez nem adott, akkor a blogposztokat kilistázza.

    require_once 'vendor/autoload.php';
    $filename = './data/blogposts.json';
    $postById = null;
    if(file_exists($filename)) {
        $file = true;
        $blogposts = json_decode(file_get_contents($filename,true),true);
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
    <title>HTML 5 Boilerplate</title>
  </head>
  <body>
    <?php if($file):?>
        <?php if($postById): ?>
            <h1>A kért blogpost:</h1>
            <h2><?php echo $postById['title'] ?></h2>
            <p><?php echo $postById['author'] ?></p>
            <p><strong><?php echo $postById['description'] ?></strong></p>
            <p><?php echo $postById['text'] ?></p>
            <p><a href="./blog.php">Vissza</a></p>
        <?php else: ?>
            <h1>Blogposztok:</h1>
            <?php foreach($blogposts as $post): ?>
                <h2><?php echo $post['title'] ?></h2>
                <p><?php echo $post['author'] ?></p>
                <p><strong><?php echo $post['description'] ?></strong></p>
                <p><a href="./blog.php?id=<?php echo $post['id'] ?>" >Részletek</a></p>
            <?php endforeach; ?>
        <?php endif; ?>
    <?php else: ?>
        <h1>A blogposztok nem betölthetőek</h1>
    <?php endif; ?>
  </body>
</html>
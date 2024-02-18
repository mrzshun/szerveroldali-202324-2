<?php
    // Feladat: generáljunk faker segítségével blogposztokat, ennek legyen ID-ja, címe, szerzője, szövegtörzse
    // Legyen random, hogy hányat generálunk, ezt is generáljuk fakerrel

    require_once 'vendor/autoload.php';
    $faker = Faker\Factory::create();
    $to_generate = $faker->randomNumber(2, true);
    $blogposts = [];
    for($i = 0; $i<$to_generate; $i++) {
        $blogposts[$i] = [
            'id' => $faker->unique()->randomNumber(3,false),
            'title' => $faker->sentence(),
            'author' => $faker->name(),
            'text' => $faker->paragraphs($faker->randomDigitNotNull(),true),
        ];
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
  <h1>Blogposts</h1>
  <pre>
    <?php
        echo json_encode($blogposts,JSON_PRETTY_PRINT);
    ?>
  </pre>
  </body>
</html>
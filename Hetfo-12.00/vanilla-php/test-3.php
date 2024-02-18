<?php

    // Feladat: generáljunk blogposztokat
    // Egy blogposzt álljon ID-ból, címből, szerzőből, összefoglalóból és textből.
    // Fakerrel monjuk meg, hogy hány db-ot generáljunk és minden adatot fakerrel csináljunk!
    // Az eredményt írjuk ki formázott json-ként

    require_once 'vendor/autoload.php';
    $faker = Faker\Factory::create();
    $blogposts = [];
    $num = $faker->randomNumber(2, true);
    for($i=0; $i<$num; $i++) {
        $blogposts[$i] = [
            'id' => $faker->unique()->randomNumber(3, false),
            'title' => $faker->sentence(),
            'author' => $faker->name(),
            'description' => $faker->paragraph(),
            'text' => $faker->paragraphs($faker->randomDigitNotNull(),true)
        ];
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
    <h1>Blogposztok:</h1>
    <pre>
        <?php
            echo json_encode($blogposts,JSON_PRETTY_PRINT);
        ?>
    </pre>
  </body>
</html>
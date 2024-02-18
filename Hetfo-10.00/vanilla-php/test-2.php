<?php
    // Feladat: írjuk át az előző feladatot úgy, hogy Faker-t használunk
    // Azaz faker php könyvtárat, amit a packagist-ről töltünk le / installálunk composer segítségével

    require_once 'vendor/autoload.php';
    $faker = Faker\Factory::create();
    $to_generate = isset($_GET['num']) ? $_GET['num'] : 10; //todo: _GET[]

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
  <h1>Generált nevek:</h1>
    <table>
        <tr>
            <th>#num</th>
            <th>name</th>
            <th>email</th>
        </tr>
    <?php for($i=0;$i<$to_generate;$i++): ?>
        <tr>
            <td><?php echo $i ?></td>
            <td><?php echo $faker->name() ?></td>
            <td><?php echo $faker->email() ?></td>
        </tr>
    <?php endfor; ?>
    </table>
  </body>
</html>
<?php

    // Feladat: írjunk egy egyszerű PHP programot, amely generál egy nevet és egy hozzá tartozó email címet
    // utána: generáljunk N db ilyet, ahol az N az jöjjön egy $_GET[] paraméterből

    $num = isset($_GET['num']) ? $_GET['num'] : 10;

    $msg = "Hello world!";
    // névgeneráló függvény
    function generateName() {
        $familyNames = ['Kovacs','Varga','Kiss','Nagy','Horvath'];
        $givenNames = ['Istvan','Erik','Gyozo','Zoltan','Dorottya','Lujza','Melinda'];
        return $familyNames[array_rand($familyNames)].' '.$givenNames[array_rand($givenNames)];
    }

    // email generáló függvény
    function generateEmail($name) {
        $emailEndings = ['gmail.com','yahoo.com','freemail.hu'];
        $nameArray = explode(' ',$name);
        $simpleName = "";
        if(sizeof($nameArray) == 0) {
            $simpleName = "gipsz.jakab";
        }
        elseif(sizeof($nameArray) == 1) {
            $simpleName = strtolower($nameArray[0]);
        }
        else {
            $simpleName = strtolower($nameArray[0].'.'.$nameArray[1]);
        }
        return $simpleName.'@'.$emailEndings[array_rand($emailEndings)];
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
    <h1>Generált nevek (<?php echo $num ?> db.)</h1>
    <table>
        <tr>
            <th>#num</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
        <?php for($i=0;$i<$num;$i++):?>
            <tr>
                <td><?php echo $i+1 ?></td>
                <td><?php echo($name = generateName())?></td>
                <td><?php echo generateEmail($name) ?></td>
            </tr>
        <?php endfor; ?>
    </table>
  </body>
</html>
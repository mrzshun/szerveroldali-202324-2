<?php
    // Feladat: generáljunk 1 db. nevet és 1 db hozzá tartozó email címet és írjuk ki.
    // Később: n db-ot, ahol az n-t egy _GET[] paraméterből olvassuk ki

    $to_generate = isset($_GET['num']) ? $_GET['num'] : 10; //todo: _GET[]
    function generateName() {
        $familyName = ['Kovacs','Nagy','Marias','Varga','Bodnar'];
        $givenName = ['Istvan','Gyozo','David','Erik','Dorottya','Lujza'];
        return $familyName[array_rand($familyName)].' '.$givenName[array_rand($givenName)];
    }
    function generateEmail($name) {
        $emailEndings = ['gmail.com','yahoo.com','freemail.hu'];
        $nameArray = explode(' ',$name);
        if(sizeof($nameArray) == 0) {
            $sname = 'gipsz.jakab';
        }
        elseif(sizeof($nameArray) == 1) {
            $sname = $nameArray[0];
        }
        else{
            $sname = $nameArray[0].'.'.$nameArray[1];
        }
        $email = strtolower($sname.'@'.$emailEndings[array_rand($emailEndings)]);
        return $email;
    }

    $generatedName = generateName();
    $generatedEmail = generateEmail($generatedName);
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
            <td><?php echo($name = generateName()) ?></td>
            <td><?php echo generateEmail($name) ?></td>
        </tr>
    <?php endfor; ?>
    </table>
  </body>
</html>
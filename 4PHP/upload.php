<?php

  while (list($indeks,$plik) = each($_FILES[pliki][name])) {
    $gdzie = "upload/$plik";
    copy($_FILES[pliki][tmp_name][$indeks],$gdzie);
  }
  header('Location: show.php');
 ?>

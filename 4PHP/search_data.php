<?php
  require_once "connect.php";

  if($polaczenie->connect_errno!=0)
  {
    echo "Error: ".$polaczenie->connect_errno;
  }
  else
  {
    $search = $_POST['login'];
    $zapytanie = "SELECT * FROM uzytkownicy WHERE login='$search'";
    $wynik = $polaczenie->query($zapytanie);
    $ile_znalezionych = $wynik->num_rows;
    $str = '';
    for ($i=0; $i <$ile_znalezionych; $i++){
      $wiersz = $wynik->fetch_assoc();
      $str = $wiersz['login']."\n";
      $str .= $wiersz['imie']."\n";
      $str .= $wiersz['nazwisko']."\n";
    }
    // ucina białe znaki z końca str
    echo rtrim($str);

    $polaczenie->close();
  }
 ?>

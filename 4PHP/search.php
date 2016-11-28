<?php
  require_once "connect.php";

  if($polaczenie->connect_errno!=0)
  {
    echo "Error: ".$polaczenie->connect_errno;
  }
  else
  {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $search = $_POST['search'];
    } else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $search = $_GET['search'];
    }
    $zapytanie = "SELECT login FROM uzytkownicy WHERE login LIKE '%$search%' LIMIT 10";
    $wynik = $polaczenie->query($zapytanie);
    $ile_znalezionych = $wynik->num_rows;
    $str = "";
    for ($i=0; $i <$ile_znalezionych; $i++){
      $wiersz = $wynik->fetch_assoc();
      $str .= $wiersz['login']."\n";
    }
    // ucina białe znaki z końca str
    echo rtrim($str);
  }
 ?>

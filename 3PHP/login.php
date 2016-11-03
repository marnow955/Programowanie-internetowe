<?php

  session_start();

  if (!isset($_POST['login']) || !isset($_POST['haslo'])) {
    header('Location: index.php');
    exit();
  }

  $poprawny_login = 'student';
  $poprawne_haslo = 'zet';
  // $hash_poprawnego_hasla = password_hash($poprawne_haslo,PASSWORD_DEFAULT);
  $hash_poprawnego_hasla = crypt($poprawne_haslo);

  $login = $_POST['login'];
  $haslo = $_POST['haslo'];

  // if($login==$poprawny_login && password_verify($haslo,$hash_poprawnego_hasla)==true){
  if($login==$poprawny_login && crypt($haslo,$hash_poprawnego_hasla)==$hash_poprawnego_hasla){
    $_SESSION['zalogowany'] = true;
    unset($_SESSION['blad']);

    header('Location: form.php');
  } else {
    $_SESSION['error'] = '<span style="color:#7e0000">Nieprawidłowy login lub hasło!</span>';
    header('Location: index.php');
  }

 ?>

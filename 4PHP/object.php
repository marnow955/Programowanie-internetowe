<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <title>Programowanie obiektowe</title>
    <meta name="author" content="Marek Noworolnik"/>
    <meta name="description" content="Programowanie internetowe - obiektowe" />
    <meta name="keywords" content="Programowanie internetowe, www, Marek Noworolnik, obiektowość" />

    <link rel="stylesheet" href="../masterCSS.css" type="text/css" />
  </head>
  <body>

    <div class="container">
      <div class="content">

        <?php

          class Osoba
          {
            public $imie;
            public $nazwisko;
            public $pesel;

            function __construct($i, $n, $p)
            {
              $this->imie = $i;
              $this->nazwisko = $n;
              $this->pesel = $p;
            }

            function __destruct()
            {
              $this->imie = "null";
              $this->nazwisko = "null";
              $this->pesel = "null";
            }

            public function wypisz()
            {
              return 'Imię: '.$this->imie.', Nazwisko: '.$this->nazwisko.', PESEL: '.$this->pesel;
            }
          }

          class Student extends Osoba
          {
            private $ocena;
            function __construct($i, $n, $p, $o)
            {
              Osoba::__construct($i,$n,$p);
              $this->ocena = $o;
            }
            function __destruct()
            {
              Osoba::__destruct();
              $this->ocena = "null";
            }
            public function wypisz()
            {
              return Osoba::wypisz().', ocena: '.$this->ocena;
            }
          }

          echo 'Tworzenie obiektów: <br/>';
          $os1 = new Osoba("Jan","Kowalski","123456789");
          echo $os1->wypisz().'<br/>';
          $st1 = new Student("Piotr","Rusek","987654321","6");
          echo $st1->wypisz().'<br/>';

          echo '<br/>Po serializacji - zniszczone wcześniejszcze elementy: </br>';
          $os2 = serialize($os1);
          $st2 = serialize($st1);
          $os1->__destruct();
          $st1->__destruct();
          echo $os1->wypisz().'<br/>';
          echo $st1->wypisz().'<br/>';

          echo '<br/>Po deserializacji - nowe obiekty: </br>';
          $os3 = unserialize($os2);
          $st3 = unserialize($st2);
          echo $os3->wypisz().'<br/>';
          echo $st3->wypisz().'<br/>';
         ?>

      </div>

      <div class="footer">
        Linki do źródeł:
        <a href="object_code.html">object.php</a>
        <a href="../masterCSS_code.html">masterCSS.css</a>
      </div>
    </div>

  </body>
</html>

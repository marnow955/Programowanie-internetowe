<?PHP
  $katalog = './upload/';
  $plik = $_GET['plik'];

  $fd = fopen($katalog.$plik,"r");
  $size = filesize($katalog.$plik);
  $contents = fread($fd, $size);

  fclose($fd);

  header("Content-Type: application/octet-stream");
  header("Content-Length: $size;");
  header("Content-Disposition: attachment; filename=$plik");

  echo $contents;
?>

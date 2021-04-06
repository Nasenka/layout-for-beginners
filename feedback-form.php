<?php
$name = htmlspecialchars($_POST["name"]);
$phone = htmlspecialchars($_POST["phone"]);
$email = htmlspecialchars($_POST["email"]);
$message = htmlspecialchars($_POST["message"]);

$to = "nastyab18@mail.ru";
$subject = "От посетителя сайта";
$text = "На сайте была заполнена форма обратной связи.<br />
Имя отправителя: $name <br />
Телефон: $phone <br />
E-mail: $email <br />
Текст сообщения: $message ";

$header .= "Content-type: text/html; charset=utf-8\r\n";
$header .= "MIME-Version: 1.0\r\n";
mail($to, $subject, $text, $header);
?>

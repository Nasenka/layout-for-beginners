<?php
$name = htmlspecialchars($_POST["name"]);
$phone = htmlspecialchars($_POST["phone"]);

$to = "nastyab18@mail.ru";
$subject = "От посетителя сайта";
$text = "На сайте была заполнена форма заказа звонка.<br />
Имя отправителя: $name <br />
Телефон: $phone ";

$header .= "Content-type: text/html; charset=utf-8\r\n";
$header .= "MIME-Version: 1.0\r\n";
mail($to, $subject, $text, $header);
?>

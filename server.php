<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

$_POST = json_decode(file_get_contents("php://input"), true);
// echo var_dump($_POST);

$name = $_POST["name"];
$phone = $_POST["phone"];
if(!empty($phone))

{
    $token = "5730025804:AAHZN4PSaYYs98tKkrhCIS8cOtA3ZEhldJE";
            $chat_id = "-845664090";
            $sitename = "Cleangroup-perm"; // Указываем название сайта
            $arr = array(

                'Лид с сайта: ' => $sitename,
                'Имя: ' => $name,
                $uphoneFieldset => urlencode('+'). $phone
            );
            foreach($arr as $key => $value) {
                $txt .= "<b>".$key."</b>".$value."%0A";
            };
            $sendToTelegram = fopen("https://api.telegram.org/bot".$token."/sendMessage?chat_id=".$chat_id."&parse_mode=html&text=".$txt,"r");

}

} else {
    header ("Location: "); // главная страница вашего лендинга
}
?>

// Подключен axios.min.js в шаблоне

const TOKEN = "6439049822:AAHuQyECo9HqHDpzRcj9qwrt384oisaNJYY";
const CHAT_ID = "-1002094796235";
const URL_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;

const form = document.getElementById("feedback");

if (form) form.addEventListener('submit', (evt) => sendMsgTelegram(evt));


function sendMsgTelegram (evt) {
  evt.preventDefault();
  const form = evt.target;

  let message = `<b>Заявка с сайта ООО Система - Радиационное оборудование</b>\n`;

  message += `<b>Имя отправителя:</b> ${ form.name.value }\n`;
  message += `<b>Телефон:</b> ${ form.phone.value }\n`;

  //message += `<b>Сообщение:</b> ${ this.message.value }\n`;

  axios.post(URL_API, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message,
  })
    .then(() => {
      console.log('Заявка успешно отправлена');
    })
    .catch((err) => {
      console.warn(err);
    })
    .finally(() => {
      console.log('Конец');
    });
  alert('Заявка отправлена успешно');
  form.reset()
};

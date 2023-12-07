// Подключен axios.min.js в шаблоне

const TOKEN = "6439049822:AAHuQyECo9HqHDpzRcj9qwrt384oisaNJYY";
const CHAT_ID = "-1002094796235";
const URL_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;

const feedback = document.getElementById("feedback");

if (feedback) {
  feedback.addEventListener('submit', (evt) => sendMsgTelegram(evt));


  const form = feedback.querySelector(".feedback__form");
  const messageSuccess = feedback.querySelector(".feedback-message__body-success");
  const messageError = feedback.querySelector(".feedback-message__body-error");


  function submitSuccess () {
    console.log("Success")
    form.classList.add("hidden");
    messageSuccess.classList.add("visible");

    setTimeout(() => {
      form.classList.remove("hidden");
      messageSuccess.classList.remove("visible");
      form.reset();
    }, 5000);
  }

  function submitError () {
    console.log("Error")
    form.classList.add("hidden");
    messageError.classList.add("visible");

    setTimeout(() => {
      form.classList.remove("hidden");
      messageError.classList.remove("visible");
      form.reset();
    }, 5000);
  }


  function sendMsgTelegram (evt) {
    evt.preventDefault();
    const form = evt.target;

    let message = `<b>Заявка с сайта ООО Система - Радиационное оборудование</b>\n`;

    message += `<b>Имя отправителя:</b> ${ form.name.value }\n`;
    message += `<b>Телефон:</b> ${ form.phone.value }\n`;

    axios.post(URL_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message,
    })
      .then(() => {
        console.log('Заявка успешно отправлена');
        submitSuccess();
      })
      .catch((err) => {
        console.warn(err);
        submitError();
      })
      .finally(() => {
        console.log('Конец');
      });
  };



}






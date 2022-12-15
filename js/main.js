const btnMainMenuBurger = document.querySelector('.main-nav__toggle');
const mainMenu = document.querySelector('.main-nav__list');
const btnCloseMainMenu = document.querySelector('.main-nav__toggle-close');
const form = document.querySelector('.form');
const formBtnSend = form.querySelector('.button-main--send-form');
const formInputs = form.querySelectorAll('.form__input--data');
const modalOrder = document.querySelector('.modal');
const modalBtnClose = modalOrder.querySelector('.modal__btn-close');

// Слайдер
var mySlider = new rSlider({
    target: '#sampleSlider',
    values: {min: 1, max: 100},
    step: 1,
    range: false,
    tooltip: true,
    scale: false,
    labels: false,
    set: [75]
});

// Показать бургерное меню при клике на бургер
const showMainMenu = () => {
    if (mainMenu.classList.contains('main-nav__list--closed')) {
        mainMenu.classList.remove('main-nav__list--closed');
        btnCloseMainMenu.style.display = 'block';
    }
};

btnMainMenuBurger.addEventListener('click', showMainMenu);

// Закрыть бургерное меню
const closeMainMenu = () => {
    mainMenu.style.animation = 'hiddenMenu 0.5s ease 0s 1 normal forwards';
    btnCloseMainMenu.style.display = 'none';
    setTimeout(() => {
      mainMenu.classList.add('main-nav__list--closed');
      mainMenu.removeAttribute('style');
    }, 500)
}

btnCloseMainMenu.addEventListener('click', closeMainMenu);

// Проверка на наличие незаполненных полей с присвоением красной обводки
const isFieldFilled = (evt) => {
    let count = 0;
    formInputs.forEach((input) => {
      if (input.value === '') {
        evt.preventDefault();
        count += 1;
          input.classList.add('form__input--error', 'form__input--shake-error');
          setTimeout(() => {
              input.classList.remove('form__input--shake-error');
          }, 400);
      }
    })
    // Показ модалки об отправке формы, если все поля заполнены
    if (count === 0) {
        evt.preventDefault();
        modalOrder.classList.remove('hidden');
        form.reset();
    }
  }

// Удаление красной обводки при наборе текста
    formInputs.forEach((input) => {
        input.onchange = () => {
            if (input.classList.contains('form__input--error')) {
                input.classList.remove('form__input--error');
            }
        }
    });

form.addEventListener('submit', isFieldFilled);

// Закрытие модалки
const closeModalOrder = () => {
    modalOrder.style.animation = 'closeModal 0.5s ease 0s 1 normal forwards';
    setTimeout(() => {
        modalOrder.classList.add('hidden');
        modalOrder.removeAttribute('style')
    }, 500);
}

modalBtnClose.addEventListener('click', closeModalOrder);

// Проверка на нажатую кнопку Esc и клик по оверлею
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const isOverlayClick = (evt) => evt.target === modalOrder;

// Проверка на нажатую кнопку Esc и закрытие модалки
const onModalFullAdEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModalOrder();
    }
  };

  document.addEventListener('keydown', onModalFullAdEscKeydown);

  // Проверка по клику на оверлей и закрытие модалки
  const onModalFullAdOverlayClick = (evt) => {
    if (isOverlayClick(evt)) {
      evt.preventDefault();
      closeModalOrder();
    }
  };

  document.addEventListener('click', onModalFullAdOverlayClick);

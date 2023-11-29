const accordionItems = document.querySelectorAll('.accordion__item'); // список элементов аккордиона

if (accordionItems) {
  const toggleClass = (item) => item.classList.toggle('js-accordion-active');

  accordionItems.forEach(accordionItem => {
    accordionItem.addEventListener('click', () => toggleClass(accordionItem));
  });
}

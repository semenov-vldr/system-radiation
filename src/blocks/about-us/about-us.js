const time = 1000; // ms
const step = 1;


function outNum(num, elem) {
  let n = 0;
  let t = Math.round(time/(num/step));
  let interval = setInterval(() => {
    n = n + step;
    if (n === num) clearInterval(interval);
    if (elem.id === "value1") {
      elem.innerHTML = n + "+";
    } else {
      elem.innerHTML = n;
    }
  }, t);
}


function callback (entry) {
  const id = entry.target.id;
  const target = entry.target;
  if (id === "value1") outNum(100, target);
  if (id === "value2") outNum(38, target);
  if (id === "value3") outNum(24, target);
  if (id === "value4") outNum(5, target);

  if (entry.isIntersecting) observer.unobserve(target)
};


const observer = new IntersectionObserver(entries => {
  entries.forEach(callback);
},
  {
  threshold: 0.5
});

const values = document.querySelectorAll(".about-us-statistics__value");
if (values) {
  values.forEach(value => observer.observe(value));
}

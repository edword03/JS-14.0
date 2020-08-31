const color = document.querySelector('#color-text'),
      change = document.getElementById('change');

const changeBg = () => {
  const randomNum = Math.floor(Math.random() * 16777215).toString(16);

  document.body.style.backgroundColor  = '#' + randomNum;
  color.textContent = '#' + randomNum;
  change.style.color = '#' + randomNum;
};

change.addEventListener('click', changeBg);
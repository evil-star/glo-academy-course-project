// Начальное модальное окно
let createBtn = document.querySelector(".popup-btn"),
  popupOverlay = document.querySelector(".overlay"),
  mainPage = document.querySelector(".main"),
  customPage = document.querySelector(".custom");

createBtn.addEventListener("click", function() {
  popupOverlay.className += " animated fadeOut";
  mainPage.className += " animated fadeOutRight";

  setTimeout(function() {
    popupOverlay.style.display = "none";
  }, 1000);

  customPage.style.display = "flex";
  customPage.className += " animated fadeIn";
  for (var i = 0; i < customPage.children.length; i++) {
    customPage.children[i].style.display = "block";
  }
});

// Кастомизация
let sexMaleRadio = document.querySelector("#male"),
  sexFemaleRadio = document.querySelector("#female"),
  clothesSlide = document.querySelectorAll(".clothes-style"),
  hairSlide = document.querySelectorAll(".hair-style"),
  skinSlide = document.querySelectorAll(".skin-color"),
  personClothes = document.querySelector("#person-clothes"),
  personHair = document.querySelector("#person-hair"),
  personSkin = document.querySelector("#person-skin"),
  sex = "male";

// Смена пола
sexMaleRadio.addEventListener("change", function() {
  sex = "male";
  personSkin.style.backgroundImage = "url(img/skin/skin-1.png)";
  clothesCurrent = 0;
  hairCurrent = 0;
  skinCurrent = 0;
  clothesChange();
  hairChange();
  skinChange();
});
sexFemaleRadio.addEventListener("change", function() {
  sex = "female";
  personSkin.style.backgroundImage = "url(img/skin/skin-4.png)";
  clothesCurrent = 3;
  hairCurrent = 3;
  skinCurrent = 0;
  clothesChange();
  hairChange();
  skinChange();
});

// Смена одежды
function clothesChange() {
  for (var i = 0; i < clothesSlide.length; i++) {
    clothesSlide[i].style.display = "none";
  }

  if (sex == "male") {
    if (clothesCurrent < 0) {
      clothesCurrent = 2;
    } else if (clothesCurrent > 2) {
      clothesCurrent = 0;
    }
  } else if (sex == "female") {
    if (clothesCurrent < 3) {
      clothesCurrent = 5;
    } else if (clothesCurrent > 5) {
      clothesCurrent = 3;
    }
  }

  clothesSlide[clothesCurrent].style.display = "block";
  personClothes.style.backgroundImage = `url(img/clothes/construct/clothes-${clothesCurrent +
    1}.png`;
}

// Смена волос
function hairChange() {
  for (var i = 0; i < hairSlide.length; i++) {
    hairSlide[i].style.display = "none";
  }

  if (sex == "male") {
    if (hairCurrent < 0) {
      hairCurrent = 2;
    } else if (hairCurrent > 2) {
      hairCurrent = 0;
    }
  } else if (sex == "female") {
    if (hairCurrent < 3) {
      hairCurrent = 5;
    } else if (hairCurrent > 5) {
      hairCurrent = 3;
    }
  }

  hairSlide[hairCurrent].style.display = "block";
  personHair.style.backgroundImage = `url(img/hair/construct/hair-${hairCurrent +
    1}.png`;
}

// Смена кожи
function skinChange() {
  for (var i = 0; i < skinSlide.length; i++) {
    skinSlide[i].style.display = "none";
  }

  if (skinCurrent > 2) {
    skinCurrent = 0;
  } else if (skinCurrent < 0) {
    skinCurrent = 2;
  }

  skinSlide[skinCurrent].style.display = "block";
  personSkin.style.backgroundImage = `url(img/skin/skin-${
    sex == "male" ? skinCurrent + 1 : skinCurrent + 4
  }.png`;
}

// Слайдеры
let clothesPrev = document.querySelector(".clothes .prev"),
  clothesNext = document.querySelector(".clothes .next"),
  hairPrev = document.querySelector(".hair .prev"),
  hairNext = document.querySelector(".hair .next"),
  skinPrev = document.querySelector(".skin .prev"),
  skinNext = document.querySelector(".skin .next"),
  clothesCurrent = 0,
  hairCurrent = 0,
  skinCurrent = 0;

clothesPrev.addEventListener("click", function() {
  clothesChange((clothesCurrent -= 1));
});
clothesNext.addEventListener("click", function() {
  clothesChange((clothesCurrent += 1));
});

hairPrev.addEventListener("click", function() {
  hairChange((hairCurrent -= 1));
});
hairNext.addEventListener("click", function() {
  hairChange((hairCurrent += 1));
});

skinPrev.addEventListener("click", function() {
  skinChange((skinCurrent -= 1));
});
skinNext.addEventListener("click", function() {
  skinChange((skinCurrent += 1));
});

// Кнопка "готово"
let readyBtn = document.querySelector("#ready"),
  person = {},
  cardsBlock = document.querySelector(".main-cards"),
  newPerson = document.querySelector(".main-cards-item").cloneNode(true);

readyBtn.addEventListener("click", function() {
  let name = document.querySelector("#name").value,
    age = document.querySelector("#age").value,
    sex = document.querySelector("[name=sex]:checked").value,
    views = document.querySelector("#select").value,
    bio = document.querySelector("#bio").value,
    valid = true;

  // Валидация полей
  if (name !== "" && isNaN(+name)) {
    document.querySelector("#name").style.border = "none";
  } else {
    document.querySelector("#name").style.border = "1px solid red";
    valid = false;
  }
  if (age !== "" && !isNaN(+age) && +age >= 30 && +age <= 100) {
    document.querySelector("#age").style.border = "none";
  } else {
    document.querySelector("#age").style.border = "1px solid red";
    valid = false;
  }
  if (bio !== "" && isNaN(+bio) && bio.length >= 20) {
    document.querySelector("#bio").style.border = "none";
  } else {
    document.querySelector("#bio").style.border = "1px solid red";
    valid = false;
  }
  if (!valid) {
    return;
  }

  person.name = name;
  person.age = age;
  person.sex = sex;
  person.views = views;
  person.bio = bio;

  // Переносим значения полей в новую карточку
  newPerson.querySelector(".name").textContent = person.name;
  newPerson.querySelector(".age").textContent = person.age;
  newPerson.querySelector(".sex").textContent = person.sex;
  newPerson.querySelector(".views").textContent = person.views;
  newPerson.querySelector(".bio").textContent = person.bio;
  newPerson.querySelector(".photo").innerHTML = document.querySelector(
    ".person.construct"
  ).innerHTML;
  newPerson.querySelector(".photo").classList.remove("photo-1");

  cardsBlock.appendChild(newPerson);

  mainPage.classList.remove("fadeOutRight");
  mainPage.classList.add("fadeIn");

  customPage.classList.remove("fadeIn");
  customPage.className += " fadeOutRight";

  // Обнуляем голоса
  let progressBar = mainPage.querySelectorAll(".progress-bar"),
    progressBarNumber = mainPage.querySelectorAll(".result-count");
  for (var i = 0; i < progressBar.length; i++) {
    progressBar[i].style.height = "0%";
    progressBarNumber[i].textContent = "0%";
  }
});

// Провести честное голосование
let votes = [],
  trueVoteBtn = document.querySelector("#voting"),
  isVoted = false;

trueVoteBtn.addEventListener("click", function() {
  votes = [];
  votes[0] = getRndInteger(0, 100);

  if (votes[0] < 100) {
    votes[1] = getRndInteger(0, 100 - votes[0]);
    if (votes[0] + votes[1] < 100) {
      votes[2] = 100 - votes[0] - votes[1];
    } else {
      votes[2] = 0;
    }
  } else {
    votes[1] = 0;
    votes[2] = 0;
  }

  let progressBar = mainPage.querySelectorAll(".progress-bar"),
    progressBarNumber = mainPage.querySelectorAll(".result-count");
  for (var i = 0; i < progressBar.length; i++) {
    progressBar[i].style.height = votes[i] + "%";
    progressBarNumber[i].textContent = votes[i] + "%";
  }

  isVoted = true;
});

// Получение рандомного числа
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Сброс результатов
let resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", function() {
  mainPage.classList.remove("fadeIn");
  mainPage.classList.add("fadeOutRight");

  customPage.classList.remove("fadeOutRight");
  customPage.className += " fadeIn";

  let inputs = document.querySelectorAll("input, textarea");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }

  clothesCurrent = 3;
  hairCurrent = 3;
  skinCurrent = 0;
  clothesChange();
  hairChange();
  skinChange();
});

// Вмешаться в выборы
let crime = document.querySelector("#crime");

crime.addEventListener("click", function() {
  if (isVoted) {
    let progressBar = mainPage.querySelectorAll(".progress-bar"),
      progressBarNumber = mainPage.querySelectorAll(".result-count"),
      popularIndex = mostPopular(votes);

    if (votes[popularIndex] >= 25 && votes[2] <= 75) {
      votes[popularIndex] -= 25;
      votes[2] += 25;
    }

    for (var i = 0; i < progressBar.length; i++) {
      progressBar[i].style.height = votes[i] + "%";
      progressBarNumber[i].textContent = votes[i] + "%";
    }
  } else {
    alert("Сначала нужно провести честное голосование");
  }
});

let mostPopularIndex = 0;

function mostPopular(arr) {
  let mostPopularValue = 0;
  for (var i = 0; i < votes.length - 1; i++) {
    if (votes[i] > mostPopularValue) {
      mostPopularValue = votes[i];
      mostPopularIndex = i;
    }
  }
  return mostPopularIndex;
}

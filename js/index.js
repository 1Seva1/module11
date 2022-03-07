// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
let tempFruits = fruits.slice();
/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  fruitsList.innerHTML = '';
  for (let i = 0; i < fruits.length; i++) {
    const colorBorder = ['fruit_violet', 'fruit_green', 'fruit_carmazin', 'fruit_yellow', 'fruit_lightbrown']
    let li = document.createElement('li');
    li.className = "fruit__item";
    li.classList.add(colorBorder[i]);
    fruitsList.appendChild(li);
    let div = document.createElement('div');
    div.className = "fruit__info";
    li.appendChild(div);
    let info = "" ;
    info += "<div>" + `index: ${i} ` + "</div>" + "<div>" + `kind: ${fruits[i].kind} ` + "</div>" + "<div>" + `color: ${fruits[i].color} ` + "</div>" + "<div>" + `weight (кг): ${fruits[i].weight}` + "</div>";
    div.innerHTML = info;
  }

};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
    
// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  while (fruits.length > 0) {
    min = 0;
    max = fruits.length;
    let i = getRandomInt(min,max);
    let temp = [];
    temp = fruits.slice(i,i+1);
    fruits.splice(i, 1);
    result = result.concat(temp);
  }
  (tempFruits == result) ? alert('Порядок не изменился!') : fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
 let filterArr = fruits.filter(item => {
    const minweight = document.querySelector('.minweight__input');
    const maxweight = document.querySelector('.maxweight__input');
    console.log(minweight.value);
    return item.weight >= minweight.value && item.weight <= maxweight.value;  
  });
  fruits = filterArr;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  const priority = ['фиолетовый', 'зеленый', 'розово-красный', 'желтый', 'светло-коричневый']
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 > priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n-1; i++) { 
        // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n-1-i; j++) { 
            // сравниваем элементы
            if (comparation(arr[j], arr[j+1])) { 
                // делаем обмен элементов
                let temp = arr[j+1]; 
                arr[j+1] = arr[j]; 
                arr[j] = temp; 
            }
        }
    }     
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
  console.log(sortTime);
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});

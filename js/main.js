
//on run page
$(function () {
    let width = $('.nav-tab').outerWidth();
    $('.nav-tab').animate({ marginLeft: - width }, 500)
    $('.close').on('click', function () {
        let width = $('.nav-tab').outerWidth();
        $('.nav-tab').animate({ marginLeft: - width }, 500)
    })

    $('.bars-icon').on('click', function () {
        let width = $('.nav-tab').outerWidth();
        $('.nav-tab').animate({ marginLeft: "0" }, 500)
    })

    $(document).ready(function () {
        $('.loadingScreen').fadeOut(500);
    })
    $(document).ready(function () {
        $('.loadingScreen2').fadeOut(400);
        $('body').css('overflow', 'auto')
    })

})
let result = [];
let rowData = document.getElementById('row');
let row = document.querySelector('.row');
let home = document.querySelector('.home');
home.addEventListener('click', function () {
    $('.loadingScreen2').fadeIn(0);
    let width = $('.nav-tab').outerWidth();
    $('.nav-tab').animate({ marginLeft: - width }, 500);
    displayInput.style = "display:none";
    displayDataToGetMeal(result)
    $('.loadingScreen2').fadeOut(500);
})
//function display any meals

async function getMeal() {
    let response = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)).json();
    result = response.meals
    console.log(result);
    displayDataToGetMeal(result);
}
function 

displayDataToGetMeal(result) {
    $('.loadingScreen2').fadeIn(0);
    let divs = ""
    for (let i = 0; i < result.length; i++) {
        divs += `
        <div class="col-md-3 ">
        <div onclick="getId('${result[i].idMeal}')" class="meal">
            <img src="${result[i].strMealThumb}"class="w-100">
            <div class="meal-layer">    
                  <h3>${result[i].strMeal}</h3>
                  <p></p>
            </div>
        </div>
       
    </div>
        `
        row.innerHTML = divs;
        $('.loadingScreen2').fadeOut(500);
    }
}
getMeal();

let mealId;
//function display any ditaeils about meals//
async function getId(id) {
    let resultId = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
    mealId = resultId.meals;
    console.log(mealId)
    displayMealId();
}
function displayMealId() {
    $('.loadingScreen2').fadeIn(0);
    let html = ""
    for (let i = 1; i <= 20; i++) {
        if (mealId[0][`strIngredient${i}`]) {
            html += `<span class="span">${mealId[0][`strMeasure${i}`]} ${mealId[0][`strIngredient${i}`]}</span>`;
        }
    }
    let divs = ""
    divs += `
      <div class="mealId">
                        <div class="row">
                            <div class="col-lg-4">
                            <button onclick="displayDataToGetMeal(result)" class="btn btn-dark mb-2 w-50">Back To Home</button>
                              <div>
                                <img src="${mealId[0].strMealThumb}"class="w-100">
                            <h3 class="mt-2">Name : ${mealId[0].strMeal}</h3>
                              </div>
                            </div>
                            <div class="col-lg-7">
                                <div >
                                    <h2>Instructions</h2>
                                 <p>${mealId[0].strInstructions.slice(0, 1000)}</p>
                                <h4>Area : ${mealId[0].strArea}</h4>
                                <h4>Category : ${mealId[0].strCategory}</h4>
                                <h4>Recipes:
                                </h4>
                               <div class="inner"> ${html}</div>
                               <h4 class="fs-3 my-3">Tags : </h4>
                               <div class="mb-5" >
                               <a href="${mealId[0].strSource}"  target="_blank" class="bg-dark p-2 rounded-2 text-white fs-5">source</a>
                               <a href="${mealId[0].strYoutube}"  target="_blank" class="bg-danger p-2 rounded-2 text-white fs-5">Youtube</a>
                               </div>
                                </div>

                            </div>
                        </div>
                    </div>
      `
    row.innerHTML = divs;
    displayInput.style = "display:none"
    $('.loadingScreen2').fadeOut(500);
}
let items;
//function get categories//
let Categories = document.querySelector('.Categories');
Categories.addEventListener('click', async function () {
    $('.loadingScreen2').fadeIn(0);
    let width = $('.nav-tab').outerWidth();
    $('.nav-tab').animate({ marginLeft: - width }, 500)
    displayInput.style = "display:none"
    let resultId = await (await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)).json();
    items = resultId.categories
    console.log(items);
    displayCategories()
    $('.loadingScreen2').fadeOut(500);
})
//function get categories to fillter//
async function filterCategories(idCategorty) {
    let filter = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${idCategorty}`)).json();
    let respone = filter.meals
    displayCategories()
    displayDataToGetMeal(respone);
}
//function get categories to fillter display//
function displayCategories() {
    let divs = ""
    for (let i = 0; i < items.length; i++) {
        divs += `
        <div   class="col-md-3">
        <div onclick="filterCategories('${items[i].strCategory}')" class="meal">
            <img src="${items[i].strCategoryThumb}"class="w-100">
            <div class="meal-layer p-2">    
                  <h3>${items[i].strCategory}</h3>
                  <p class="text-white">${items[i].strCategoryDescription.slice(0, 100)}</p>
            </div>
        </div>
    </div>
        `
        row.innerHTML = divs;
    }
}
let areaMeal;
let area = document.querySelector('.area');
//function get area//
area.addEventListener('click', async function () {
    $('.loadingScreen2').fadeIn(0);
    let width = $('.nav-tab').outerWidth();
    $('.nav-tab').animate({ marginLeft: - width }, 500)
    displayInput.style = "display:none"
    let area = await (await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)).json();
    areaMeal = area.meals
    console.log(areaMeal);
    displayArea()
    $('.loadingScreen2').fadeOut(500);
})
//function get area to display//
function displayArea() {
    let divs = ""
    for (let i = 0; i < areaMeal.length; i++) {
        divs += `
       <div onclick=" areaId('${areaMeal[i].strArea}')" class="col-md-3">
       <a href="#" class="d-flex flex-column justify-content-center align-items-center fs-1 text-white mb-5">
    <img src="images/favicon.png" class="w-25 text-center"> ${areaMeal[i].strArea}</a>
    </div>
    `
    }
    row.innerHTML = divs;
}
//function get area to display ditaels meals//
async function areaId(area) {
    let getId = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)).json();
    let areadisplay = getId.meals;
    displayDataToGetMeal(areadisplay)
}
let ingredients = document.querySelector('.ingredients');
//function get ingredients//
ingredients.addEventListener('click', async function () {
    $('.loadingScreen2').fadeIn(0);
    let width = $('.nav-tab').outerWidth();
    $('.nav-tab').animate({ marginLeft: - width }, 500)
    displayInput.style = "display:none"
    let getIngredients = await (await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)).json();

    displayIngredients(getIngredients.meals.slice(0, 20));
    $('.loadingScreen2').fadeOut(500);
})
//function get ingredients to display//
function displayIngredients(display) {
    let divs = ""
    for (let i = 0; i < display.length; i++) {
        divs += `
       <div onclick="getIngredients('${display[i].strIngredient}')"  class="col-md-3 Ingredients px-3">
       <a href="#" class="d-flex flex-column justify-content-center align-items-center fs-3 text-white mb-5">
    <img src="images/hero-img.png" class="w-50 text-center"> ${display[i].strIngredient} <p class="fs-6 text-center mt-2">${display[i].strDescription.split(" ").slice(0, 20).join(" ")}</p></a>
    </div>
       
    `
    }
    row.innerHTML = divs;
}
//function get ingredients to diplay meals details//
async function getIngredients(idIngredients) {
    let getIdData = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${idIngredients}`)).json()
    let data = getIdData.meals
    displayDataToGetMeal(data)
}
let search = document.querySelector('.search');
let displayInput = document.querySelector('.displayInput');
console.log(displayInput);
function displayInputs() {

    displayInput.innerHTML = `
  <div class="container ">
  <h2 class="text-center mb-4 searchH2  ps-3">"Search About Your Favorite Food" <i class="fa-solid fa-cookie-bite" style="color: #FFD43B;"></i> </h2>
  <div class="row d-flex justify-content-center mb-5">
  <div class="col-md-5"><input  onkeyup="displaySearch(this.value)" class="form-control mb-3 " placeholder=" Food by Name"></div>
  <div class="col-md-5"><input maxLength="1" onkeyup="displaySearchByLetter(this.value)" class="form-control  " placeholder=" Food by letter"></div>
  </div> 
  </div>
`
    row.innerHTML = "";
}
//function get serch by name //
search.addEventListener('click', async function () {
    $('.loadingScreen2').fadeIn(0);
    let width = $('.nav-tab').outerWidth();
    $('.nav-tab').animate({ marginLeft: - width }, 500)
    displayInput.style = "display:block"
   
    displayInputs();
    $('.loadingScreen2').fadeOut(500);
})
//function get serch display by name sraech//
async function displaySearch(value) {
    $('.loadingScreen2').fadeIn(0);
    let searchByName = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)).json();
    let data = searchByName.meals
    data ? displayDataToGetMeal(data) : displayDataToGetMeal([]);
    $('.loadingScreen2').fadeOut(500);
}
//function get serch display by letter sraech//
async function displaySearchByLetter(valueInput) {
    $('.loadingScreen2').fadeIn(0);
    valueInput == "" ? valueInput = "a" : "";
    let value = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valueInput}`)).json();
    let valueMeals = value.meals;
    valueMeals ? displayDataToGetMeal(valueMeals) : displayDataToGetMeal([]);
    $('.loadingScreen2').fadeOut(500);
}
//function get countact us display //
let contactUs = document.querySelector('.ContactUs')
contactUs.addEventListener('click', function () {
    $('.loadingScreen2').fadeIn(0);
    let width = $('.nav-tab').outerWidth();
    $('.nav-tab').animate({ marginLeft: - width }, 500)
    displayInput.style = "display:none"
    let divs = ""
    divs += `
    <div id="container" class="container">
    <div class="row d-flex justify-content-center align-items-center">
    <div class="col-md-5"><input onkeyup="validateName()" id="nameInput"  class="form-control mb-3" placeholder=" Enter Your Name">
    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    write from 4 to 20 word
    </div>
    </div>
    <div class="col-md-5"><input onkeyup="validateEmail() " id="emailInput"  class="form-control mb-3 " placeholder="Enter Your Email">
    <div id="emailAlert" class="alert alert-danger w-100 my-2 d-none">
                    write valid Email you must have @&.co
    </div>
    </div>
    </div> 
    <div class="row d-flex justify-content-center ">
    <div class="col-md-5"><input onkeyup="validPhoneNumber()" id="phoneInput" class="form-control mb-3 " placeholder=" Enter Your Phone">
    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    write valid phone number
    </div>
    </div>
    <div class="col-md-5 "><input onkeyup="validAge()" id="ageInput" type="number"  class="form-control mb-3 " placeholder="Enter Your Age">
    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
         write valid number
    </div>
    </div>
    </div> 
    <div class="row d-flex justify-content-center ">
    <div class="col-md-5"><input type="password" onkeyup="validPassword()"  id="passwordInput" class="form-control mb-3 " placeholder="Enter Your Password">
    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
    password should contain atleast one number and one special character
    </div>
    </div>
    <div class="col-md-5"><input onkeyup="rePassword()" type="password" id="repassword" class="form-control mb-3" placeholder=" RePassword">
    <div id="repasswordAleart" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid repassword
    </div>
    </div>
    <button id="sub-btn" disabled class="btn btn-outline-danger w-25">Submit</button>
    </div> 
    </div>
    `
    row.innerHTML = divs;
    $('.loadingScreen2').fadeOut(500);
})

//the all valdition in website//
let submitBtn = document.getElementById('sub-btn')
function validateName() {
    const nameInput = document.getElementById('nameInput');
    const nameAlert = document.getElementById('nameAlert');
    if (/^[a-zA-Z ]{4,30}$/.test(nameInput.value)) {
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');

        return true;
    }
    else {
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
        return false;
    }
}
function validateEmail() {
    const emailInput = document.getElementById('emailInput');
    const emailAlert = document.getElementById('emailAlert');
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(emailInput.value)) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        emailAlert.classList.add('d-none');
        return true;
    }
    else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        emailAlert.classList.remove('d-none');
        return false;
    }
}
function validPhoneNumber() {
    const phoneInput = document.getElementById('phoneInput');
    const phoneAlert = document.getElementById('phoneAlert');
    if (/^(?:\+?20)?(01)[0125]\d{8}$/.test(phoneInput.value)) {
        phoneInput.classList.add('is-valid');
        phoneInput.classList.remove('is-invalid');
        phoneAlert.classList.add('d-none');

        return true;
    }
    else {
        phoneInput.classList.add('is-invalid');
        phoneInput.classList.remove('is-valid');
        phoneAlert.classList.remove('d-none');
        return false;
    }
}
function validPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordAlert = document.getElementById('passwordAlert');
    if (/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(passwordInput.value)) {
        passwordInput.classList.add('is-valid');
        passwordInput.classList.remove('is-invalid');
        passwordAlert.classList.add('d-none');

        return true;
    }
    else {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');
        passwordAlert.classList.remove('d-none');

        return false;
    }
}
function rePassword() {
    const passwordInput = document.getElementById('passwordInput');
    const repassword = document.getElementById('repassword');
    const repasswordAleart = document.getElementById('repasswordAleart');
    if (passwordInput.value === repassword.value) {
        repassword.classList.add('is-valid');
        repassword.classList.remove('is-invalid');
        repasswordAleart.classList.add('d-none');
        $('#sub-btn').removeAttr('disabled');
        return true;
    } else {
        repassword.classList.add('is-invalid');
        repassword.classList.remove('is-valid');
        repasswordAleart.classList.remove('d-none');
        $('#sub-btn').attr('disabled', "true");
        return false;
    }
}
function validAge() {
    const ageInput = document.getElementById('ageInput');
    const ageAlert = document.getElementById('ageAlert');
    if (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value)) {
        ageInput.classList.add('is-valid');
        ageInput.classList.remove('is-invalid');
        ageAlert.classList.add('d-none');
        return true;
    }
    else {
        ageInput.classList.add('is-invalid');
        ageInput.classList.remove('is-valid');
        ageAlert.classList.remove('d-none');
        return false;
    }
}





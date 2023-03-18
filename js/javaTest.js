
let content=document.getElementById("mainMenue");
let searchContainer=document.getElementById("searchContainer");
let submitBTN;


$("#search").click(function () {
    displaySearch()
    closeNav()
})
$("#Area").click(function () {
    getArea()
    closeNav()
    // getAreaMeals()
})
$("#Categories").click(function () {
    getCategory()
    closeNav()
    // getCategoryMeals()
})
$("#Ingredients").click(function () {
    getIngr()
    closeNav()
    // getIngredientsMeals()
})
$("#Contact").click(function () {
    displayContacts()
    closeNav()
    // getIngredientsMeals()
})


function openNav() {
    $(".sideNav").animate({left: 0}, 500)


    $(".click i").removeClass("fa-align-justify");
    $(".click i").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({top: 0}, (i + 5) * 100)
    }
}
function closeNav() {
    let x = $(".sideNav .navBAR").outerWidth()
    $(".sideNav").animate({left: -x}, 500)

    $(".click i").addClass("fa-align-justify");
    $(".click i").removeClass("fa-x");


    $(".links li").animate({ top: 300}, 500)
}
closeNav()
$(".sideNav .click i").click(() => {
    if ($(".sideNav").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})

// end sidenav




// start home section
async function mainMenue() {
    content.innerHTML="";
    let load=document.querySelector("#spinner")
        load.classList.remove("d-none");
    let mainMeals= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let response=await mainMeals.json();
    displayMainMeals(response.meals.slice(0, 20))
    load.classList.add("d-none");
    

    // console.log(response.meals[0]);
}
mainMenue()

function displayMainMeals(arr) {
    var cartona="";
    for (let i = 0; i < arr.length; i++) {
        cartona+=`
        <div class="col-md-3 position-relative">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer ">
        <img src="${arr[i].strMealThumb}" class="w-100 " alt="">
       <div class="cover p-2">
           <h3>${arr[i].strMeal}</h3>
       </div>
       </div>

   </div>
        ` 
    }
    content.innerHTML=cartona;
}
// end home section


// category
async function getCategory() {
    content.innerHTML=""
    let load=document.querySelector("#spinner")
        load.classList.remove("d-none");
    searchContainer.innerHTML=""
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response=await response.json()
    displayCategory(response.categories)
    load.classList.add("d-none");
    console.log(response.categories[0].strCategory);
}

function displayCategory(arr) {
    var cartona="";
 for (let i = 0; i < arr.length; i++) {
    cartona+=`
    <div class="col-md-3">
    <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img src="${arr[i].strCategoryThumb}"  class="w-100 " alt="">
            <div class="cover2 text-dark text-center">
                <h3>${arr[i].strCategory}</h3>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
       </div>
    `
   
 }
    content.innerHTML=cartona;
}
// category


// Area
async function getArea() {
    content.innerHTML=""
    let load=document.querySelector("#spinner")
        load.classList.remove("d-none");
    searchContainer.innerHTML=""
    let areas=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    areas=await areas.json()
    displayArea(areas.meals)
    load.classList.add("d-none");
    // console.log(catego);
  

    
    // console.log(res.categories[0]);
}

function displayArea(arr) {
    var cartona="";
 for (let i = 0; i < arr.length; i++) {
    cartona+=`
    <div class="col-md-3 position-relative text-white cursor-pointer">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="point text-center bg-dark rounded-2 ">
        <i class="fa-solid fa-house-laptop fa-4x "></i>
        <h3>${arr[i].strArea}</h3>
        </div>
       </div>
    `
   
 }
    content.innerHTML=cartona;
}
   
// Area


// ingrediants
async function getIngr() {
    content.innerHTML=""
    let load=document.querySelector("#spinner")
        load.classList.remove("d-none");
    searchContainer.innerHTML=""
    let ing=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    ing=await ing.json()
    displayIngr(ing.meals.slice(0, 20))
    load.classList.add("d-none");
    console.log(ing.meals[0].strDescription.split(" ").slice(0,20).join(" "));

}

function displayIngr(arr) {
    var cartona="";
 for (let i = 0; i < arr.length; i++) {
    cartona+=`
    <div class="col-md-3 position-relative text-white text-center">
        <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="point rounded-2 cursor-pointer">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${arr[i].strIngredient}</h3>
        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
       </div>
    `
   
 }
    content.innerHTML=cartona;
}
// ingrediants

async function getCategoryMeals(category) {
    content.innerHTML=""
    let load=document.querySelector("#spinner")
        load.classList.remove("d-none");
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response=await response.json()
    displayMainMeals(response.meals.slice(0, 20))
    load.classList.add("d-none");
}


async function getAreaMeals(area) {
    content.innerHTML=""
    let load=document.querySelector("#spinner")
        load.classList.remove("d-none");
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response=await response.json()
    displayMainMeals(response.meals.slice(0, 20))
    load.classList.add("d-none");
}


async function getIngredientsMeals(ingr) {
    content.innerHTML=""
    let load=document.querySelector("#spinner")
        load.classList.remove("d-none");
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`)
    response=await response.json()
    displayMainMeals(response.meals.slice(0, 20))
    load.classList.add("d-none");
}





async function getMealDetails(mealID) {
    content.innerHTML="";
    let load=document.querySelector("#spinner")
    load.classList.remove("d-none");
    searchContainer.innerHTML=""
    let deta=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    let respon= await deta.json();
    displayMealDetails(respon.meals[0])
    load.classList.add("d-none");
 
}



function displayMealDetails(comp) {
    searchContainer.innerHTML=""

let ingrediants="";
for (let i = 1; i <= 20; i++) {
    if (comp[`strIngredient${i}`]){
        ingrediants+=` <li class= "alert alert-info m-2 p-1">${comp[`strMeasure${i}`]}${comp[`strIngredient${i}`]}</li>`
    }
    // console.log(ingrediants);
}


let tags=comp.strTags?.split(",")
    if (!tags) tags = []


    let tagStr="";
    for (let i = 0; i < tags.length; i++) {
        tagStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
        // console.log(tagStr);   
    }




    let cartoona="";
    cartoona+=`   <div class="col-md-4 text-white">
    <div class="pic w-100"><img src="${comp.strMealThumb}" class="rounded-2 w-100" alt=""></div>
    <h2>${comp.strMeal}</h2>
</div>
<div class="col-md-8 text-white">
    <h2>Instructions</h2>
    <p>${comp.strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${comp.strArea}</h3>
    <h3><span class="fw-bolder">Category  : </span>${comp.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="comp list-unstyled d-flex g-3 flex-wrap">
    ${ingrediants}

    </ul>
    <h3>Tags :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${tagStr}
       
</ul>
<a href="${comp.strSource}" target="_blank" class="btn btn-success" rel="noopener noreferrer">Source</a>
<a href="${comp.strYoutube}" target="_blank" class="btn btn-danger"  rel="noopener noreferrer">Youtube</a>
</div>`
content.innerHTML=cartoona;
}




// start search section
function displaySearch() {
    searchContainer.innerHTML=`
    <div class="row py-4">
    <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" type="text" class="form-control bg-dark-subtle text-dark"  placeholder="Search By Name" >
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByLetter(this.value)" type="text" maxlength="1" class="form-control bg-dark-subtle text-dark"  placeholder="Search By NameSearch By First Letter">
         
        </div>
        </div>
    `
content.innerHTML=""
}

async function searchByName(term) {
    content.innerHTML=""
    let load=document.querySelector("#spinner")
    load.classList.remove("d-none");
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response=await response.json() 
    load.classList.add("d-none");
    response.meals ? displayMainMeals(response.meals) : displayMainMeals([]) 
    load.classList.add("d-none"); 
    console.log(response.meals)
}

async function searchByLetter(term) {
    content.innerHTML=""
    term == "" ? term = "a" : "";
    let load=document.querySelector("#spinner")
    load.classList.remove("d-none");
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response=await response.json()
    load.classList.add("d-none");
    response.meals ? displayMainMeals(response.meals) : displayMainMeals([])
    load.classList.add("d-none");
    console.log(response)
}

// end search section


// contact section
function displayContacts() {
    content.innerHTML=`
    <div class="contact min-vh-100  d-flex justify-content-center align-items-center">
<div class="container w-75 text-center">
    <div class="row g-2">
        <div class="col-md-6">
            <input type="text" onkeyup="inputValidation()" class="form-control" id="floatingInput" placeholder="Enter Your Name">
            <div id="nameValid" class="alert alert-danger w-100 mt-2 d-none"> Special characters and numbers not allowed</div>
        </div>
        <div class="col-md-6">
            <input type="email" onkeyup="inputValidation()" class="form-control" id="floatingEmail" placeholder="Enter Your Email">
            <div id="emailValid" class="alert alert-danger w-100 mt-2 d-none"> Email not valid *exemple@yyy.zzz</div>
        </div>
        <div class="col-md-6">
            <input type="text" onkeyup="inputValidation()" class="form-control" id="floatingnumber" placeholder="Enter Your Phone">
            <div id="phoneValid" class="alert alert-danger w-100 mt-2 d-none"> Enter valid Phone Number</div>
        </div>
        <div class="col-md-6">
            <input type="number" onkeyup="inputValidation()" class="form-control" id="floatingAge" placeholder="Enter Your Age">
            <div id="ageValid" class="alert alert-danger w-100 mt-2 d-none"> Enter valid age</div>
        </div>
        <div class="col-md-6">
            <input type="password" onkeyup="inputValidation()" class="form-control" id="floatingPassword" placeholder="Enter Your password">
            <div id="passwordValid" onkeyup="inputValidation()" class="alert alert-danger w-100 mt-2 d-none">  Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
        </div>
        <div class="col-md-6">
            <input type="password" onkeyup="inputValidation()" class="form-control" id="floatingPasswordRepeat" placeholder="Repeat password">
            <div id="repeatPassValid" class="alert alert-danger w-100 mt-2 d-none"> Enter valid repassword </div>
        </div>
    </div> 
       
       
      <button class="btn btn-outline-danger mt-4" id="submit" disabled> submit</button>
     
     
       
</div>
</div>
    `

submitBTN=document.getElementById("submit")

document.getElementById("floatingInput").addEventListener("focus",function () {
    nameInput=true
})
document.getElementById("floatingEmail").addEventListener("focus",function () {
    emailInput=true
})
document.getElementById("floatingnumber").addEventListener("focus",function () {
    phoneInput=true
})
document.getElementById("floatingAge").addEventListener("focus",function () {
    ageInput=true
})
document.getElementById("floatingPassword").addEventListener("focus",function () {
   passwordInput=true
})
document.getElementById("floatingPasswordRepeat").addEventListener("focus",function () {
    repeatInput=true
})
}
let nameInput=false;
let emailInput=false;
let phoneInput=false;
let ageInput=false;
let passwordInput=false;
let repeatInput=false;

function inputValidation() {
    if (nameInput) {
        if (nameValidation()) {
            document.getElementById("nameValid").classList.replace("d-block", "d-none")
        }else{
            document.getElementById("nameValid").classList.replace("d-none", "d-block")
        }
    }
    if (emailInput) {
        if (emailValidation()) {
            document.getElementById("emailValid").classList.replace("d-block", "d-none")
        }else{
            document.getElementById("emailValid").classList.replace("d-none", "d-block")
        }
    }
    if (phoneInput) {
        if (phoneValidation()) {
            document.getElementById("phoneValid").classList.replace("d-block", "d-none")
        }else{
            document.getElementById("phoneValid").classList.replace("d-none", "d-block")
        }
    }
    if (ageInput) {
        if (ageValidation()) {
            document.getElementById("ageValid").classList.replace("d-block", "d-none")
        }else{
            document.getElementById("ageValid").classList.replace("d-none", "d-block")
        }
    }
    if (passwordInput) {
        if (passwordValidation()) {
            document.getElementById("passwordValid").classList.replace("d-block", "d-none")
        }else{
            document.getElementById("passwordValid").classList.replace("d-none", "d-block")
        }
    }
    if (repeatInput) {
        if (repeatPasValidation()) {
            document.getElementById("floatingPasswordRepeat").classList.replace("d-block", "d-none")
        }else{
            document.getElementById("floatingPasswordRepeat").classList.replace("d-none", "d-block")
        }
    }
    if ( nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repeatPasValidation()) {
    submitBTN.removeAttribute("disabled")
} else {
    submitBTN.setAttribute("disabled", true)
}
}







function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("floatingInput").value))
}
function emailValidation() {
    return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById("floatingEmail").value))
}
function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("floatingnumber").value))
}
function ageValidation() {
    return (/^[1-9]?[0-9]{1}$|^100$/.test(document.getElementById("floatingAge").value))
}
function passwordValidation() {
    return ( /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("floatingPassword").value))
}
function repeatPasValidation() {
    return document.getElementById("floatingPasswordRepeat").value==document.getElementById("floatingPassword").value
}

let sideWidth = $(".nav-tab").innerWidth();
$(".side-nav-menu").animate({ left: `-${sideWidth}` });
$("#contact-us").hide();
$("#search-container").hide();

function showNav() {
    $("#closeBtn").show();
    $("#sidebarBtn").hide();
    $(".side-nav-menu").animate({ left: `0px` });
}

function hideNav() {
    let sideWidth = $(".nav-tab").innerWidth();
    $(".side-nav-menu").animate({ left: `-${sideWidth}` });
    $("#sidebarBtn").show();
    $("#closeBtn").hide();
}

async function getAreas() {
    let response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let result = await response.json();
    let areas = result.meals;
    for (let i = 0; i < areas.length; i++) {
        let dataContainer =
            /* HTML */
            `
                <div class="col-md-3">
                    <div class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${areas[i].strArea}</h3>
                    </div>
                </div>
            `;
        $("#areas").append(dataContainer);
    }
}

async function getIngredients() {
    let response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    let result = await response.json();
    let meals = result.meals;
    for (let i = 0; i < meals.length; i++) {
        let dataContainer =
            /* HTML */
            `
                <div class="col-md-3">
                    <div class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${meals[i].strIngredient}</h3>
                        <p>
                            ${meals[i].strDescription
                                .split(" ")
                                .slice(0, 20)
                                .join(" ")}
                        </p>
                    </div>
                </div>
            `;
        $("#ingredients").append(dataContainer);
    }
}

async function getCategories() {
    hideNav();
    let response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    let result = await response.json();
    let categories = result.categories;
    for (let i = 0; i < categories.length; i++) {
        let dataContainer =
            /* HTML */
            `
                <div class="col-md-3">
                    <div
                        class="meal position-relative overflow-hidden rounded-2 cursor-pointer"
                    >
                        <img
                            class="w-100"
                            src="${categories[i].strCategoryThumb}"
                            alt=""
                            srcset=""
                        />
                        <div
                            class="meal-layer position-absolute text-center text-black p-2"
                        >
                            <h3>${categories[i].strCategory}</h3>
                            <p>${categories[i].strCategoryDescription}.[1]</p>
                        </div>
                    </div>
                </div>
            `;
        $("#categories").append(dataContainer);
    }
}

async function searchBy(key, value) {
    hideNav();
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?${key}=${value}`
    );
    let result = await response.json();
    let meals = result.meals;
    if (meals === null) {
        $("#search-result").html("");
        return;
    }

    let dataContainer = [];
    for (let i = 0; i < meals.length; i++) {
        const meal =
            /* HTML */
            `
                <div class="col-md-3">
                    <div
                        class="meal position-relative overflow-hidden rounded-2 cursor-pointer"
                    >
                        <img
                            class="w-100"
                            src="${meals[i].strMealThumb}"
                            alt=""
                            srcset=""
                        />
                        <div
                            class="meal-layer position-absolute d-flex align-items-center text-black p-2"
                        >
                            <h3>${meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            `;
        dataContainer.push(meal);
    }
    $("#search-result").html(dataContainer.join(""));
}

$(".categories").on("click", () => {
    getCategories();
    hideNav();
    $("#home").hide();
    $("#areas").hide();
    $("#contact-us").hide();
    $("#ingredients").hide();
    $("#categories").show();
});

$(".ingredients").on("click", () => {
    getIngredients();
    hideNav();
    $("#home").hide();
    $("#categories").hide();
    $("#areas").hide();
    $("#contact-us").hide();
    $("#ingredients").show();
});

$(".areas").on("click", () => {
    getAreas();
    hideNav();
    $("#home").hide();
    $("#ingredients").hide();
    $("#categories").hide();
    $("#contact-us").hide();
    $("#areas").show();
});

$(".contact-us").on("click", () => {
    hideNav();
    $("#home").hide();
    $("#ingredients").hide();
    $("#categories").hide();
    $("#areas").hide();
    $("#contact-us").show();
});

$(".search").on("click", () => {
    hideNav();
    $("#home").hide(() => {
        $("#search-container").show();
    });
});

$("#closeBtn").on("click", () => {
    hideNav();
});

$("#sidebarBtn").on("click", () => {
    showNav();
});

$("#searchByName").on("keyup", function () {
    let searchValue = $(this).val();
    searchBy("s", searchValue);
});

$("#searchByFilter").on("keyup", function () {
    let searchValue = $(this).val();
    searchBy("f", searchValue);
});

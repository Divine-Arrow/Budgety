var data = document.querySelector(".card_wrapper input");
var lis = document.querySelector(".card_wrapper ul");
var button = document.querySelector("button");
var allItems = [];
var match = false;
var counterPopup = true;

var allli = document.querySelectorAll(".card_wrapper ul li");
var popupContainer = document.querySelector(".popup_container");
var deleteContainer = document.querySelector(".delete_container");
var popupContainerButton = document.querySelector(".popup_container button");
var searchItems = document.querySelector(".searchItems");

// not found
var notFound = document.querySelector(".notFound");
var markAllBtn = document.querySelector(".mark_all");
var unMarkAllBtn = document.querySelector(".unmark_all");
var deleteAllBtn = document.querySelector(".delete_all");
var reverseBtn = document.querySelector(".reverse_all");

button.addEventListener("click", function () {
    mainAll();
})

popupContainerButton.addEventListener("click", function () {
    popupContainer.style.display = "none";
    data.value = "";
})

function enter(temp, value) {
    if (temp.keyCode == 13 && value !== "") {

        // Double enter  notification pannel hidden
        mainAll();
    }
}

function mainAll() {
    if (popupContainer.style.display === "block") {
        popupContainer.style.display = "none";
        data.value = "";
        counterPopup = false;
    }

    if (data.value === " ") {
        data.value = "";
        alert("Only space cannot be added");
    }
    checkSpaceInBeginning();
    checkSpaceInEnd();

    if (data.value !== "" && data.value[0] !== " " && counterPopup) {
        checkItems();
        if (match) {
            popupContainer.style.display = "block";

        } else {
            addTopBorder();
            addListItem();
        }
        match = false;
    }
    counterPopup = true;
}

function addListItem() {
    var newli = document.createElement("li");
    var divli = document.createElement("div");
    if (data.value !== "") {
        allItems[allItems.length] = capitalise(data.value);
        newli.innerHTML = capitalise(data.value);
        divli.onclick = function () {
            this.parentNode.parentNode.removeChild(this.parentNode);
            // To Delte first li(border top) when items are empty
            var checkLi = document.querySelectorAll(".card_wrapper ul li")[1];
            if (!checkLi) {
                var li = document.querySelector(".card_wrapper ul li");
                li.style.display = "none";
            }
            // End To Delte first li(border top) when items are empty
        };
        newli.appendChild(divli);
        lis.appendChild(newli);
        data.value = "";
        var delBtn = document.querySelectorAll(".card_wrapper li div");
        for (var i = 0; i < delBtn.length; i++) {
            delBtn[i].classList.add("delete-btn");
        }
        // code for click marking
        var allli = document.querySelectorAll(".card_wrapper ul li");
        for (var i = 0; i < allli.length; i++) {
            allli[i].onclick = function () {
                this.classList.toggle("checked");
                this.childNodes[1].classList.toggle("whiteDel");
            }
        }
    }
}

function capitalise(x) {
    // data.value
    return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
}

function allLowerCase(y) {
    return y.toLowerCase();
}

function checkSpaceInEnd() {
    if (data.value[data.value.length - 1] === " ") {
        data.value = data.value.slice(0, data.value.length - 1);
        checkSpaceInEnd();
    }
}

function checkSpaceInBeginning() {
    if (data.value[0] === " ") {
        data.value = data.value.slice(1, data.value.length);
        checkSpaceInBeginning();
    }
}

function checkSpaceInEnd() {
    if (data.value[data.value.length - 1] === " ") {
        data.value = data.value.slice(0, data.value.length - 1);
        checkSpaceInEnd();
    }
}

function matchCase() {
    var z = searchItems.value;
    removeSpace();
    function removeSpace() {
        if (z[0] === " ") {
            z = z.slice(1, z.length);
            removeSpace();
        } else if (z[z.length - 1] === " ") {
            z = z.slice(0, z.length - 1);
            removeSpace();
        }
    }

    return z.toLowerCase();
}

function addTopBorder() {
    // to show first line (li) [top border]
    var li = document.querySelector(".card_wrapper ul li");
    li.style.display = "block";
    // end to show first line (li) [top border]
}

function checkItems() {

    var allLis = document.querySelectorAll(".card_wrapper ul li");
    var allTodo = [];
    for (var i = 0; i < allLis.length; i++) {
        allTodo[i] = allLis[i].textContent;
    }

    for (var i = 0; i < allTodo.length; i++) {
        if (capitalise(data.value) === allTodo[i]) {
            match = match + true;
        } else {
            match = match + false;
        }
    }
}

// new search pro
function searchingItem() {
    var allLis = document.querySelectorAll(".card_wrapper ul li");
    var allTodo = [];
    for (var i = 0; i < allLis.length; i++) {
        allTodo[i] = allLis[i].textContent.toLowerCase();
        allLis[i].style.display = "none";
    }

    // show not found all
    notFound.style.display = "block";

    for (var i = 0; i < allTodo.length; i++) {
        var index = allTodo[i].indexOf(matchCase());
        if (index !== -1) {
            // show searched items
            allLis[0].style.display = "block";
            allLis[i].style.display = "block";
            notFound.style.display = "none";
        }
    }
    if (searchItems.value === "") {
        showAllItems();
    }
}

function showAllItems() {
    var allli = document.querySelectorAll(".card_wrapper ul li");
    notFound.style.display = "none";
    allli[0].style.display = "none"
    // For empty search hideng top border
    if (allli[1]) {
        allli[0].style.display = "block";
    }
    for (var i = 1; i < allli.length; i++) {
        allli[i].style.display = "block";
    }
    searchItems.value = "";
}


// MarkAll(check) all the Items
markAllBtn.onclick = function () {
    var allli = document.querySelectorAll(".card_wrapper ul li");
    for (var i = 1; i < allli.length; i++) {
        allli[i].classList.add("checked");
        allli[i].childNodes[1].classList.add("whiteDel");
    }
}

// unmark all(uncheck) all the items
unMarkAllBtn.onclick = function () {
    var allli = document.querySelectorAll(".card_wrapper ul li");
    for (var i = 1; i < allli.length; i++) {
        allli[i].classList.remove("checked");
        allli[i].childNodes[1].classList.remove("whiteDel");
    }
}

deleteAllBtn.onclick = function () {

    var checkforEmpty = document.querySelectorAll("li")[1];
    if (checkforEmpty) {
        deleteContainer.style.display = "block";
        var deleteAllYes = deleteContainer.querySelectorAll("button")[0];
        var deleteAllNo = deleteContainer.querySelectorAll("button")[1];

        // If yes is clicked
        deleteAllYes.onclick = function () {
            var allli = document.querySelectorAll(".card_wrapper ul li");
            for (var i = 1; i < allli.length; i++) {
                allli[i].parentNode.removeChild(allli[i]);
            }
            allli[0].style.display = "none";
            deleteContainer.style.display = "none";
        }

        // If No is clicked
        deleteAllNo.onclick = function () {
            deleteContainer.style.display = "none";
        }
    }
}

// to reverse the checked items with uncheked items
reverseBtn.onclick = function () {
    var allli = document.querySelectorAll(".card_wrapper ul li");
    for (var i = 1; i < allli.length; i++) {
        allli[i].classList.toggle("checked");
        allli[i].childNodes[1].classList.toggle("whiteDel");

    }
}

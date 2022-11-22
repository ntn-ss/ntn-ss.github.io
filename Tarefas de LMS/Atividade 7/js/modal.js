let buttonLog = document.getElementById("login");
buttonLog.addEventListener("click", login);

let customText = document.getElementById("customText");

let userCancel = document.getElementById("cancel");
let groupCancel = document.getElementById("cancelCreate");
userCancel.addEventListener("click", showModalUser);
groupCancel.addEventListener("click", showModalGroup);

let modalUser = document.getElementById("modalUser");
let modalGroup = document.getElementById("modalGroup");

let getUser = document.getElementById("username");
let getGroup = document.getElementById("groupName");

let switchUser = document.getElementById("returnModal");
switchUser.addEventListener("click", showModalUser);

function login() {
    let name = document.getElementById("name");
    if (getUser.value!=""){
        name.innerHTML = getUser.value;
        showModalUser();
        userCancel.classList.remove("hidden");
        customText.innerHTML = `Selecione um grupo à esquerda para bater um papo, ${getUser.value}!`;
    }
    else {
        alert("Insira um nome de usuário.");
    }
}

function showModalUser() {
    modalUser.classList.toggle("hidden");
}

function showModalGroup() {
    modalGroup.classList.toggle("hidden");
}
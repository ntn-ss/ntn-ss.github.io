let groups = document.querySelector(".groups");
let messages = document.querySelector(".messages");

let publicId;

function createGroups(groupsList) {
    groups.innerHTML = "<h2>Grupos</h2>";
    
    for (let group of groupsList) {
        
        let div_group = document.createElement("div");
        div_group.className = "group";
        div_group.id = group.id;

        let img_group = document.createElement("img");
        img_group.src = "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png";
        img_group.alt = "Foto do Grupo";
        img_group.style = "width: 100%; max-width: 2rem;"

        let group_name = document.createElement("span");
        let group_name_span = document.createTextNode(group.nome);

        group_name.appendChild(group_name_span);
        div_group.appendChild(img_group);
        div_group.appendChild(group_name);
        div_group.setAttribute("onclick","getMessages(this.id)");;
        groups.appendChild(div_group);

    }
    groups.innerHTML += `<div class="new-group" style="cursor: pointer;"> <span onclick="showModalGroup()"><b>Novo grupo</b></span></div>`;
}

async function newGroup() {
    let nameGroup = getGroup.value;
    try {
        let responseNewGroup = await axios ({
            method: "POST",
            url: "https://server-json-lms.herokuapp.com/grupos",
            data: {
                nome: nameGroup
            }
        });
        getGroups();
    } catch(e){
            console.log(e);
        }
}

async function getGroups() {
    try {
        let response = await axios ({
            method: "GET",
            url: "https://server-json-lms.herokuapp.com/grupos"
        });
        createGroups(response.data);
    } catch(e) {
        console.log(e);
    }
}

function createMessages(messagesList) {
    messages.innerHTML = "<h2>Mensagens</h2>";
    for (let message of messagesList) {
        let div_message = document.createElement("div");
        div_message.className = "message";
        div_message.id = message.id;

        let div_firstline = document.createElement("div");
        div_firstline.className = "first-line";

        let img_message = document.createElement("img");
        img_message.src = "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png";
        img_message.alt = "Foto do Perfil";
        img_message.style = "width: 100%; max-width: 2rem;"

        let message_username = document.createElement("span");
        let message_username_span = document.createTextNode(message.nome);
        
        let message_content = document.createElement("span");
        message_content_span = document.createTextNode(message.corpo);

        message_username.appendChild(message_username_span);
        message_content.appendChild(message_content_span);
        
        div_firstline.appendChild(img_message);
        div_firstline.appendChild(message_username);
        div_message.appendChild(div_firstline);
        div_message.appendChild(message_content);
        messages.appendChild(div_message);
    }
    messages.innerHTML+=`<div class="new-message">
    <input type="text" placeholder="Escreva aqui a sua mensagem." id="messageWrite"><button id="sendMessage">Enviar</button></div>`;
    let sendMessage = document.getElementById("sendMessage");
    sendMessage.setAttribute("onclick","newMessage()");
}

async function newMessage() {
    let messageBody = document.getElementById("messageWrite");
    let name = document.getElementById("name");
    let nameMessage = name.innerHTML;

    let idMessage = publicId;
    try {
        let responseNewMessage = await axios ({
            method: "POST",
            url: `https://server-json-lms.herokuapp.com/grupos/${publicId}/mensagens`,
            data: {
                nome: nameMessage,
                grupoId: idMessage,
                corpo: messageBody.value,
            }
        });
        console.log(responseNewMessage);
        getMessages(publicId);
    } catch(e){
            console.log(e);
        }
    }

async function getMessages(idGroup) {
    publicId = idGroup;
    try {
        let responseMessages = await axios ({
            method: "GET",
            url: `https://server-json-lms.herokuapp.com/grupos/${idGroup}/mensagens`
        });
        createMessages(responseMessages.data);
    } catch(e) {
        console.log(e);
    }
}

getGroups();
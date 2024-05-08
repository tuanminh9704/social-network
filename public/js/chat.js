// Client send message
const formData = document.querySelector(".chat .inner-form");
// console.log(formData);
if(formData){
    const inputContent = formData.querySelector("input[name='content']");
    formData.addEventListener("submit", (event) => {
        event.preventDefault();
        const content = inputContent.value;
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE_TO_SERVER", content);
            content.value = "";
        }
    });
}

// End Client send message


// Server return message

socket.on("SEVER_RETURN_MESSAGE_TO_CLIENT", (data) => {
    // console.log(data);
    const body = document.querySelector(".chat .inner-body");
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    // console.log(myId);
    // console.log(body);
    const div = document.createElement("div");
    let htmlFullname = "";
    if(data.userId != myId){
        div.classList.add("inner-incoming");
        htmlFullname = `<div class="inner-name">${data.fullName}</div>`;
    }
    else{
        div.classList.add("inner-outgoing")
    }
    div.innerHTML = `
        ${htmlFullname}
        <div class="inner-content">${data.content}</div>
    `;
    console.log(div);
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
})

// End server return message


// Scroll bottom

const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat){
    bodyChat.scrollTop = bodyChat.scrollHeight;
}

// End scroll bottom
// Button add friend

const buttonAddFriend = document.querySelectorAll("[button-add-friend]");
const buttonDelete = document.querySelectorAll("[button-delete]");
const buttonRequestCancel = document.querySelectorAll("button-requests-cancel");
console.log(buttonRequestCancel);
if(buttonAddFriend.length > 0){
    buttonAddFriend.forEach(button => {
        // console.log(button);
        button.addEventListener("click", () => {
            const userId = button.getAttribute("button-add-friend");
            button.closest(".box-user").classList.add("add");
            socket.emit("CLIENT_ADD_FRIEND", userId);
        })
    })
}

// End Button add friend
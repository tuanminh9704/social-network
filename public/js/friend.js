// Button add friend

const buttonAddFriend = document.querySelectorAll("[button-add-friend]");
const buttonDelete = document.querySelectorAll("[button-delete]");
const buttonRequestCancel = document.querySelectorAll("button-requests-cancel");
// console.log(buttonRequestCancel);
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

// Notification

// console.log(user);
socket.on("SERVER_SEND_USER", (data) => {
    // console.log(data.acceptFriend);
    const arrayAcceptFriends = data.acceptFriend;
    if(arrayAcceptFriends.length > 0){
        const notification = document.querySelector("[request-friend-notification]");
        // console.log(notification);
        notification.style.display = 'inline-block';
    }
})


// Hiển thị thông báo real time
const notification = document.querySelector("[request-friend-notification]");
const myId = document.querySelector("[my-id]").getAttribute("my-id");

// console.log(notification);
// console.log(myId);
socket.on("SERVER_RETURN_ADD_FRIEND", (data) => {
    // const userID = res.locals.user.id;
    // console.log(userID);
    // console.log(data.userId);
    if(myId == data.userId){
        // console.log("OK");
        notification.style.display = 'inline-block';
    }

})

// End Notification


// Button Accept Friend 

const buttonAcceptFriend = document.querySelectorAll("[button-accept-friend]");
// console.log(buttonAcceptFriend);
buttonAcceptFriend.forEach(button => {
    button.addEventListener("click", () => {
        const userId = button.getAttribute("button-accept-friend");
        // console.log(userId);
        const innerButton = button.closest(".inner-buttons");
        const buttonAcceptSuccess = innerButton.querySelector(".button-accept-success");
        const buttonDelete = innerButton.querySelector(".button-refuse");
        button.classList.add("d-none");
        buttonDelete.classList.add("d-none");
        buttonAcceptSuccess.classList.remove("d-none");
        socket.emit("CLIENT_SEND_ID_ACCEPT_FRIEND_TO_SERVER", userId);

    })
})

// End Button Accept Friend

const buttonRefuse = document.querySelectorAll("[button-refuse-friend]");
// console.log(buttonRefuse);
if(buttonRefuse.length > 0){
    buttonRefuse.forEach(button => {
        button.addEventListener("click", () => {
            const userIdB = button.getAttribute("button-refuse-friend");
            // console.log(userIdB);
            const innerButton = button.closest(".inner-buttons");
            const buttonAccept = innerButton.querySelector(".button-accept");
            const buttonRefused = innerButton.querySelector(".button-refused");
            buttonAccept.classList.add("d-none");
            buttonRefused.classList.remove("d-none");
            button.classList.add("d-none");
            socket.emit("CLIENT_SEND_ID_REFUSE_TO_SERVER", userIdB);
        })
    })
}
// End button refuse

// Button dots(button dâu ba chấm)

const buttonDots = document.querySelectorAll("[userId]");
const innerButton = document.querySelector(".inner-buttons");

if(buttonDots.length > 0){
    buttonDots.forEach(button => {
        button.addEventListener("click", () => {
            const userIdB = button.getAttribute("userId");
            const boxUser = button.closest(".box-user");
            // console.log(boxUser);
            const listOperation = boxUser.querySelector(".list-operation ul");
            if(listOperation.classList == "d-none"){
                listOperation.classList.remove("d-none");
            }
            else{
                listOperation.classList.add("d-none");
            }
            const buttonRefuse = listOperation.querySelector(".refuse-friend");
            // console.log(buttonRefuse);
            buttonRefuse.addEventListener("click", () => {
                socket.emit("CLIENT_SEND_ID_REFUSE_TO_SERVER", userIdB);
                const buttonFriend = innerButton.querySelector(".btn-friend");
                const buttonUnfriend = innerButton.querySelector(".btn-unfriend");
                buttonFriend.classList.add("d-none");
                buttonUnfriend.classList.remove('d-none');
                listOperation.classList.add("d-none");
            })

        })
    })
}

// End Button dots
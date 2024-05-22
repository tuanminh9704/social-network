const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images', {
  multiple: true, 
  maxFileCount: 6 // số  ảnh tôi đa khi gửi đi
});

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData) {
  const inputContent = formSendData.querySelector("input[name='content']");
  formSendData.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = inputContent.value;
    const images = upload.cachedFileArray || [];
    // console.log(images);
    if(content || images.length > 0) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content,
        images: images
      });
      inputContent.value = "";
      upload.resetPreviewPanel();
    }
  });
}
// End CLIENT_SEND_MESSAGE

// SERVER_SEND_MESSAGE
socket.on("SERVER_SEND_MESSAGE", (data) => {
  const body = document.querySelector(".chat .inner-body");
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  // console.log(myId);

  const div = document.createElement("div");
  let htmlFullName = "";
  let htmlImage = "";
  let htmlContent = "";
  if(data.content){
    htmlContent += `<div class="inner-content">${data.content}</div>`;
  }
  console.log(data.images);
  if(data.images.length > 0){
    htmlImage += `<div class="inner-images">`
    for (const image of data.images) {
      // console.log(image);
      htmlImage += `<img src="${image}">` 
    }
    htmlImage += "</div>"
  }

  if(myId != data.userId) { 
    div.classList.add("inner-incoming");
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
  } else {
    div.classList.add("inner-outgoing");
  }
  div.innerHTML = `
    ${htmlFullName}
    ${htmlContent}
    ${htmlImage}
  `;

  // console.log(div);

  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
})
// End SERVER_SEND_MESSAGE

// Scroll Chat To Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}


// Emoji 

const buttonIcon = document.querySelector(".chat .button-icon");
buttonIcon.addEventListener("click", () => {
  const emoji = document.querySelector("emoji-picker");
  // console.log(emoji.classList[1]);

  if(emoji.classList[1] === "d-none"){
    emoji.classList.remove("d-none");
  }
  else{
    emoji.classList.add("d-none");
  }
})


const emojiPicker = document.querySelector('emoji-picker');

emojiPicker.addEventListener('emoji-click', event => {
  const iconEmoji = event.detail.unicode;
  const inputContent = document.querySelector(".chat input[name='content']");
  // console.log(inputContent);
  // console.log(iconEmoji);
  inputContent.value = inputContent.value + iconEmoji;
});

// End Emoji


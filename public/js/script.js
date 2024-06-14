// console.log("OK");
// Hiển thị form tạo mới bài viết
const innerContent = document.querySelector(".inner-content");

console.log(innerContent);
if(innerContent) {
    innerContent.addEventListener("click", () => {
        const innerFormCreatePost = document.querySelector(".inner-form-create-post");
        // console.log(innerFormCreatePost);
        innerFormCreatePost.classList.remove("d-none");
        const buttonCloseForm = innerFormCreatePost.querySelector(".button-close-form");
        if(buttonCloseForm){
            buttonCloseForm.addEventListener("click", () => {
                innerFormCreatePost.classList.add("d-none");
            })
        }
    })
}

// End Hiển thị form bài viết
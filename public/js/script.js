// console.log("OK");
// Hiển thị form tạo mới bài viết
const innerContent = document.querySelector(".inner-content");

// console.log(innerContent);
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


// Button Like

const buttonLike = document.querySelectorAll(".button-like");

if(buttonLike.length > 0){
    buttonLike.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("postId");
            const status = button.classList.contains("active") ? "dislike" : "like";
            // console.log(id);
            // console.log(status);

            fetch(`/post/like/${status}/${id}`, {
                method: "PATCH"
            })
                .then(res => res.json()) 
                .then(data => {
                    if(data.code == 200) {
                        console.log(data.like);
                    }
                }) 
        })
    })
}

// End Button Like
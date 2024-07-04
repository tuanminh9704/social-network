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
                        const innerLike = button.closest(".inner-posts-wrap").querySelector(".inner-posts-like");
                        innerLike.innerHTML = data.like;
                        button.classList.toggle("active");
                    }
                }) 
        })
    })
}

// End Button Like


// Comment

const commentInput = document.querySelector(".comment-input");
if(commentInput) {
    const submitCommentButton = commentInput.querySelector("[button-submit-comment]");
    const postId = submitCommentButton.getAttribute("postId");
    // console.log(submitCommentButton);   

    submitCommentButton.addEventListener("click", () => {
        const comment = document.getElementById("commentInput").value.trim();
        console.log(postId);
        console.log(comment);
        
        if(comment != ""){
            fetch(`/post/comment/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comment })
            })
        }
    })
}
// End Comment

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

if (commentInput) {
    const submitCommentButton = commentInput.querySelector("[button-submit-comment]");
    const postId = submitCommentButton.getAttribute("postId");

    submitCommentButton.addEventListener("click", () => {
        const comment = document.getElementById("commentInput").value.trim();

        if (comment !== "") {
            fetch(`/post/comment/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comment })
            })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    const commentSection = document.querySelector(".comments-section");
                    const html = `
                        <div class='inner-comment'>
                            <div class='inner-avatar'>
                                <img src='${data.data.avatar}' alt='Avatar'>
                            </div>
                            <div class='inner-content'>
                                <div class='inner-fullname'>
                                    <h3>${data.data.fullName}</h3>
                                </div>
                                <div class='inner-title'>
                                    <p>${data.data.content}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    commentSection.insertAdjacentHTML("beforeend", html);
                    document.getElementById("commentInput").value = "";
                }
            });
        }
    });
}

// End Comment

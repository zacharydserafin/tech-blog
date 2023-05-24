const getIdFromUrl = () => {
    const urlParts = window.location.href.split('/');
    const id = urlParts[urlParts.length - 1];
    return id;
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const commentEditButton = document.querySelectorAll('.comment-update');
    const commentDeleteButton = document.querySelectorAll('.comment-delete');
  
    form.addEventListener ('submit', (e) => {
        e.preventDefault();
  
        const comment = document.querySelector('#comment').value;
  
        const formData = {
            content: comment
        }
  
        const dataString = JSON.stringify(formData);
  
        console.log(dataString);
        
        const url = `/api/comment/${getIdFromUrl()}`; 
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataString,
        })
        .then(() => {
            window.location.href=`/blog/${getIdFromUrl()}`
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));
    });

    if(commentEditButton) {
        commentEditButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                const commentId = button.dataset.commentId;
                const blogId = button.dataset.blogId;
                const url = `/comment-edit/${commentId}?blogId=${blogId}`;
                window.location.href = url
            });
        });
    };

    if (commentDeleteButton) {
        commentDeleteButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                const commentId = button.dataset.commentId;
                const url = `/api/comment/${commentId}`;

                fetch(url, {
                    method: 'DELETE',
                })
                .then(()=>{
                    window.location.href=`/blog/${getIdFromUrl()}`
                })
                .then(data => console.log(data))
                .catch(error => console.error(error));
            });
        });
    };
});
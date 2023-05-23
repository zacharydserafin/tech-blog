const getIdFromUrl = () => {
    const urlParts = window.location.href.split('/');
    const id = urlParts[urlParts.length - 1];
    return id;
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const commentEditButton = document.querySelector('#comment-update');
    const commentDeleteButton = document.querySelector('#comment-delete');
  
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
        commentEditButton.addEventListener('click', (e) => {
            const commentId = commentEditButton.dataset.commentId;
            const blogId = commentEditButton.dataset.blogId;
            const url = `/comment/${commentId}?blogId=${blogId}`;

            fetch(url, {
                method: 'GET',
            })
            .then(data => console.log(data))
            .catch(error => console.error(error));
        });
    };

    if (commentDeleteButton) {
        commentDeleteButton.addEventListener('click', (e) => {
            const commentId = commentDeleteButton.dataset.commentId;
            const url = `/api/comment-edit/${commentId}`;

            fetch(url, {
                method: 'DELETE',
            })
            .then(()=>{
                window.location.href=`/blog/${getIdFromUrl()}`
            })
            .then(data => console.log(data))
            .catch(error => console.error(error));
        });
    };
});
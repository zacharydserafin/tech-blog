const getIdFromUrl = () => {
    const urlParts = window.location.href.split('/');
    const id = urlParts[urlParts.length - 1];
    return id;
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const blogId = form.dataset.blogId;

    form.addEventListener ('submit', (e) => {
        e.preventDefault();
  
        const content = document.querySelector('#comment').value;
  
        const formData = {
            content: content,
            blog_id: blogId
        }
  
        const dataString = JSON.stringify(formData);
  
        console.log(dataString);

        const url = `/api/comment/${getIdFromUrl()}`;
  
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataString,
        })
        .then(()=>{
            window.location.href=`/blog/${blogId}`
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));
    });
});
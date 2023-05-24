const getIdFromUrl = () => {
    const urlParts = window.location.href.split('/');
    const id = urlParts[urlParts.length - 1];
    return id;
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const deleteButton = document.querySelector('#blog-delete')
  
    form.addEventListener ('submit', (e) => {
        e.preventDefault();
  
        const blogTitle = document.querySelector('#blog-title').value;
        const blogContent = document.querySelector('#blog-content').value;
  
        const formData = {
            title: blogTitle,
            content: blogContent,
        }
  
        const dataString = JSON.stringify(formData);
  
        console.log(dataString);

        const url = `/api/blog/${getIdFromUrl()}`;
  
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataString,
        })
        .then(()=>{
            window.location.href="/dashboard"
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));
    });

    deleteButton.addEventListener('click', (e) => {
        const url = `/api/blog/${getIdFromUrl()}`;

        fetch(url, {
            method: 'DELETE',
        })
        .then(()=>{
            window.location.href="/dashboard"
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));
    });
});
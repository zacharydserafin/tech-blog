document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const createButton = document.querySelector('#create-blog');

    const originalDisplay = form.style.display;
    form.style.display = "none";
  
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

        fetch('/api/blog', {
            method: 'POST',
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

    createButton.addEventListener('click', (e) => {
        createButton.style.display = "none";
        form.style.display = originalDisplay;
    });
});
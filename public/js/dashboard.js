document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
  
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
  
        fetch('/api/recipe/add-recipe', {
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
});
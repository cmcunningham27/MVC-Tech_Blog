//fetch request to log out user
const logoutFn = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    
    if(response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }

};

//fetch request to get single blog post bring to blog page
const singleBlogFn = async (id) => {
    const response = await fetch(`/blog/${ id }`, {
        method: 'GET',
    });

    if (response.ok) {
        document.location.replace(`/blog/${ id }`);
    } else {
        alert(response.statusText);
    }
};

//calls logout function when logout in nav bar is clicked
document.querySelector('#logout').addEventListener('click', logoutFn);

//declares blogs as an element
const blogs = document.getElementsByClassName('eachBlogTitle');

//adds an event listener to all blog post titles and calls the singleBlog function when any of the titles are clicked
for (let i = 0; i < blogs.length; i++) {
    blogs[i].addEventListener('click', (event) => {
        const target = event.target;
        const blog_id = target.dataset.id;
        singleBlogFn(blog_id); 
    });
};
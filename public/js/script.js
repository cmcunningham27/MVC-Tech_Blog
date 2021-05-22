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

document.querySelector('#logout').addEventListener('click', logoutFn);

const blogs = document.getElementsByClassName('eachBlogTitle');

for (let i = 0; i < blogs.length; i++) {
    blogs[i].addEventListener('click', (event) => {
        const target = event.target;
        const blog_id = target.dataset.id;
        singleBlogFn(blog_id); 
    });
};
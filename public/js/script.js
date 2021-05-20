document.querySelector('.oneBlog').style.display = 'none';
document.querySelector('.commentBox').style.display = 'flex';
document.querySelector('.postedComment').style.display = 'none';

const logoutFn = async () => {

    console.log('See me');
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
        // headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        // document.location.replace(`/blog/${ id }`);
        // console.log(response.statusText);
    } else {
        alert(response.statusText);
    }
};

const createComment = async (blog_id, content) => {

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ blog_id, content }),
        headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
        // renderComment(blog_id, content);
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

document.querySelector('.commentBtn').addEventListener('click', (event) => {

    const target = event.target;
    const blog_id = target.dataset.blog_id;
    const content = document.querySelector('.commentText').value.trim();
    document.querySelector('.commentBox').style.display = 'none';
    document.querySelector('.postedComment').style.display = 'flex';
    document.querySelector('.commentContent').innerHTML = content;
    createComment(blog_id, content);

});
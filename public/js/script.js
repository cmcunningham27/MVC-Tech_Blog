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
    // document.querySelector('.oneBlog').style.display = 'flex';
    // document.querySelector('.blogList').style.display = 'none';

    // console.log(blog_id);
    // document.querySelector('.title').innerHTML = title;
    // document.querySelector('.text').innerHTML = `Posted by ${ user } on ${ date }`;
    // document.querySelector('.oneBlogP').innerHTML = contents;
    // document.querySelector('.commentBtn').setAttribute('data-blog_id', blog_id);
    const response = await fetch(`/blog/${ id }`, {
        method: 'GET',
        // headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('blog');
    } else {
        alert(response.statusText);
    }
};


// const renderComment = async (blog_id, content) => {
//     const response = await fetch('/api/comment', {
//         method: 'GET',
//         body: JSON.stringify({ blog_id, content }),
//         headers: { 'Content-Type': 'application/json' },
//     });
//     console.log(response);
//     if (response.ok) {

//     }
// }

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
        // const title = target.dataset.title;
        // const contents = target.dataset.contents;
        // const user = target.dataset.user;
        // const date = target.dataset.date;
        // console.log(target, title, blog_id, contents);
        singleBlogFn(blog_id); 
        // const response = async (blog_id) => {

        // }
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

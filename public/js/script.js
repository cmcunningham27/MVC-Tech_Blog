document.querySelector('.oneBlog').style.display = 'none';

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

const singleBlogFn = (id, title, contents, text) => {
    document.querySelector('.oneBlog').style.display = 'flex';
    document.querySelector('.blogList').style.display = 'none';

    document.querySelector('.title').innerHTML = title;
    document.querySelector('.text').innerHTML = text;
}

document.querySelector('#logout').addEventListener('click', logoutFn);

document.querySelector('.blogList').addEventListener('click', (event) => {
    const target = event.target;
    const id = target.id;
    const title = target.dataset.title;
    const contents = target.dataset.contents;
    console.log(target, title, id, contents);

    if (target.matches('.oldBlog')) {
        const text = document.querySelector('.post').innerHTML;
        singleBlogFn(id, title, contents, text);
    }
});
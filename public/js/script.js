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

const singleBlogFn = (id, title, contents, user, date) => {
    document.querySelector('.oneBlog').style.display = 'flex';
    document.querySelector('.blogList').style.display = 'none';

    document.querySelector('.title').innerHTML = title;
    document.querySelector('.text').innerHTML = `Posted by ${ user } on ${ date }`;
    document.querySelector('.oneBlogP').innerHTML = contents;
}

document.querySelector('#logout').addEventListener('click', logoutFn);

document.querySelector('.eachBlogTitle').addEventListener('click', (event) => {
    const target = event.target;
    const id = target.id;
    const title = target.dataset.title;
    const contents = target.dataset.contents;
    const user = target.dataset.user;
    const date = target.dataset.date;
    console.log(target, title, id, contents);
    singleBlogFn(id, title, contents, user, date); 
});
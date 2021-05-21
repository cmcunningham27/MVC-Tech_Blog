document.querySelector('.pastBlogs').style.display = 'flex';
document.querySelector('.postBox').style.display = 'none';

const toggleFn = () => {
    document.querySelector('.pastBlogs').style.display = 'none';
    document.querySelector('.postBox').style.display = 'flex';
};

const newBlogFn = async (title, contents) => {
    const response = await fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.btnDiv').addEventListener('click', toggleFn);

document.querySelector('.createBtn').addEventListener('click', () => {
    const title = document.querySelector('.blogTitle').value;
    const contents = document.querySelector('.blogText').value.trim();

    newBlogFn(title, contents);
});
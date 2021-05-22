// document.querySelector('.oneBlog').style.display = 'flex';
// document.querySelector('.commentBox').style.display = 'flex';
// document.querySelector('.postedComment').style.display = 'flex';

const createComment = async (blog_id, content) => {
    console.log('blog id', blog_id);
    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ blog_id, content }),
        headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace(`/blog/${ blog_id }`)
    } else {
        alert(response.statusText);
    }
};

if (document.querySelector('.commentBtn')) {

    document.querySelector('.commentBtn').addEventListener('click', (event) => {

        const target = event.target;
        const blog_id = target.dataset.id;
        const content = document.querySelector('.commentText').value.trim();
        createComment(blog_id, content);

    });
};

// fetch request to add new comment to database
const createComment = async (blog_id, content) => {
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

// calls createComment function when CREATE button is clicked
if (document.querySelector('.commentBtn')) {

    document.querySelector('.commentBtn').addEventListener('click', (event) => {

        const target = event.target;
        const blog_id = target.dataset.id;
        const content = document.querySelector('.commentText').value.trim();
        createComment(blog_id, content);

    });
};
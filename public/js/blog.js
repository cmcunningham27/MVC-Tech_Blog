document.querySelector('#commentBox').style.display = 'flex';
document.querySelector('.postedComment').style.display = 'none';

// fetch request to add new comment to database
const createComment = async (blog_id, content) => {
    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ blog_id, content }),
        headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
        // document.location.replace(`/blog/${ blog_id }`)
    } else {
        alert(response.statusText);
    }
};

const formatDateFn = (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
};

const renderComment = async (blog_id) => {
    const response = await fetch(`/api/blog/${ blog_id }`, {
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.querySelector('#commentBox').style.display = 'none';
        document.querySelector('.postedComment').style.display = 'flex';

        const blogData= await response.json();
        console.log('blog data', blogData);
        const lastComment = blogData.comments[blogData.comments.length - 1];
        console.log('last comment', lastComment);

        document.querySelector('.commentContent').innerHTML = lastComment.content;
        document.querySelector('.commentP').innerHTML = `-- ${lastComment.user.name} ${formatDateFn(lastComment.date)}`;
    } else {
        alert(response.statusText);
    }
}

// calls createComment function when CREATE button is clicked
if (document.querySelector('.commentBtn')) {

    document.querySelector('.commentBtn').addEventListener('click', (event) => {

        const target = event.target;
        const blog_id = target.dataset.id;
        const content = document.querySelector('.commentText').value.trim();
        createComment(blog_id, content);
        renderComment(blog_id);
    });
};
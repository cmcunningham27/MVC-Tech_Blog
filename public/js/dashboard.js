document.querySelector('.pastBlogs').style.display = 'flex';
document.querySelector('.postBox').style.display = 'none';
document.querySelector('.existingBlogBox').style.display = 'none';
document.querySelector('.btnDiv').style.display = 'flex';

const editBlogFn = (title, contents, id) => {
    console.log('edit id', id);
    document.querySelector('.pastBlogs').style.display = 'none';
    document.querySelector('.existingBlogBox').style.display = 'flex';
    document.querySelector('.btnDiv').style.display = 'none';
    document.querySelector('.existingBlogTitle').setAttribute('placeholder', title);
    document.querySelector('.existingBlogText').innerHTML = contents;
    document.querySelector('.updateBtn').setAttribute('data-id', id);
    document.querySelector('.deleteBtn').setAttribute('data-id', id);
};

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

const deleteFn = async (id) => {
    console.log('delete id', id)
    const response = await fetch(`/api/blog/${ id }`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

if(document.querySelector('.pastBlogTitle')){ 
   document.querySelector('.pastBlogTitle').addEventListener('click', (event) => {
        const target = event.target;
        const title = target.dataset.title;
        const contents = target.dataset.contents;
        const id = target.dataset.id;
        editBlogFn(title, contents, id);
    }); 
};


document.querySelector('.btnDiv').addEventListener('click', toggleFn);

if(document.querySelector('.createBtn')) {
    document.querySelector('.createBtn').addEventListener('click', () => {
        const title = document.querySelector('.blogTitle').value;
        const contents = document.querySelector('.blogText').value.trim();
        newBlogFn(title, contents);
    });
};

if(document.querySelector('.deleteBtn')) {
    document.querySelector('.deleteBtn').addEventListener('click', (event) => {
        console.log('delete button', event.target.dataset.id);
        const id = event.target.dataset.id;
        deleteFn(id);
    })
}


document.querySelector('.pastBlogs').style.display = 'flex';
document.querySelector('.postBox').style.display = 'none';
document.querySelector('.existingBlogBox').style.display = 'none';
document.querySelector('.btnDiv').style.display = 'flex';

const editBlogFn = (title, contents, id) => {
    document.querySelector('.pastBlogs').style.display = 'none';

    document.querySelector('.existingBlogBox').style.display = 'flex';

    document.querySelector('.btnDiv').style.display = 'none';

    document.querySelector('.existingBlogTitle').setAttribute('placeholder', title);

    document.querySelector('.existingBlogText').innerHTML = contents;

    document.querySelector('.updateBtn').addEventListener('click', () => {
        let newTitle = '';
        if(document.querySelector('.existingBlogTitle').value) {
            newTitle = document.querySelector('.existingBlogTitle').value; 
        } else {
            newTitle = document.querySelector('.existingBlogTitle').placeholder;
        }
        
        const newContents = document.querySelector('.existingBlogText').value.trim();
        updateFn(newTitle, newContents, id);
    })

    document.querySelector('.deleteBtn').addEventListener('click', () => {
        deleteFn(id);
    })
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

const updateFn = async (title, contents, id) => {
    console.log();
    const response = await fetch(`/api/blog/${ id }`, {
        method: 'PUT',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

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
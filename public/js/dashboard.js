// hides and shows elements upon visiting the page
document.querySelector('.pastBlogs').style.display = 'flex';
document.querySelector('.postBox').style.display = 'none';
document.querySelector('.existingBlogBox').style.display = 'none';
document.querySelector('.btnDiv').style.display = 'flex';

//hies/shows elements on the page, sets attributes and inner HTML, calls update function when UPDATE button is clicked
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

//hides and shows elements
const toggleFn = () => {
    document.querySelector('.pastBlogs').style.display = 'none';
    document.querySelector('.postBox').style.display = 'flex';
};

//fetch request to add new blog to database
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

//updates a blog already in the database
const updateFn = async (title, contents, id) => {
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

//removes a specific blog from database
const deleteFn = async (id) => {
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

//calls editBlog function when blog title is clicked
if(document.querySelector('.pastBlogTitle')){ 
   document.querySelector('.pastBlogTitle').addEventListener('click', (event) => {
        const target = event.target;
        const title = target.dataset.title;
        const contents = target.dataset.contents;
        const id = target.dataset.id;
        editBlogFn(title, contents, id);
    }); 
};

//calls toggle function when New Post button is clicked
document.querySelector('.btnDiv').addEventListener('click', toggleFn);

//calls newBlog function when CREATE button is clicked
if(document.querySelector('.createBtn')) {
    document.querySelector('.createBtn').addEventListener('click', () => {
        const title = document.querySelector('.blogTitle').value;
        const contents = document.querySelector('.blogText').value.trim();
        newBlogFn(title, contents);
    });
};
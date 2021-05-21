document.querySelector('.pastBlogs').style.display = 'flex';
document.querySelector('.postBox').style.display = 'none';

const toggleFn = () => {
    document.querySelector('.pastBlogs').style.display = 'none';
    document.querySelector('.postBox').style.display = 'flex';
};

document.querySelector('.btnDiv').addEventListener('click', toggleFn);

// document.querySelector('.commentBtn').addEventListener('click', (event) => {
//     const title = document.querySelector('.blogTitle').value;
//     const contents = document.querySelector('.blogText').value;

// });
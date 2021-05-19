module.exports = {
    format_date: (date) => {
    
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()
        }`;
    }, 
    limitBlogs: (arr, max) => {
        const blog = [];

        for (let i = 0; i < max && i < arr.length; i++) {
            blog.push(arr[i]);
        }
        return blog;
    },
};   
// Using JavaScript Date methods, we get and format the month, date, and year
    // We need to add one to the month since it is returned as a zero-based value 
  
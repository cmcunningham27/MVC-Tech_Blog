// puts the date into MM/DD/YYYY format when rendered to page
module.exports = {
    format_date: (date) => {
    
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()
        }`;
    }
};     
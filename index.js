import reddit from './redditapi';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


// Form event Listener
searchForm.addEventListener('submit', (e) => {
    // get search term 
    const searchTerm = searchInput.value;
    // get search
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // get limit
    const searchLimit = document.getElementById('limit').value;

    // If empty search term
    if(searchTerm === ''){
        // Show a message
        showmessage('Please add a search term', 'alert-danger');
    }

    // Clear Input 
    searchInput.value = ''; 
    // Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        console.log(results);
        let output = '<div class="card-columns">';
        results.forEach(post => {
            
            // Check for image
            let image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';

            output += `
            <div class="card">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <a href="${post.url}" target = "_black" class="btn btn-primary">Read More</a>
                    <hr>
                    <span class="badge badge-light>Subreddit: ${post.subreddit}</span>
                    <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                    <span class="badge badge-secondary">Score: ${post.score}</span>
                </div>
            </div>
            `
        })
        output += '</div>'
        document.getElementById('results').innerHTML = output;
    })
    e.preventDefault();
});

function showmessage(message, className) {
    // create a div 
    const div = document.createElement('div');
    // Add a className
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    //get the parent
    const searchContainer = document.getElementById('search-container');
    // get search
    const search = document.getElementById('search');
    // Insert message
    searchContainer.insertBefore(div, search);
    // Timepout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Truncate string
function truncateText (text, limit){
    const shortened = text.indexOf(' ', limit);
    if(shortened == -1) return text;
    return text.substring(0, shortened);
}
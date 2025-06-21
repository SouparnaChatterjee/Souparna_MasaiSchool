let allPosts=[];
let filteredPosts=[];
let currentSort='title-asc';
//dom elements
const searchInput=document.getElementById('searchInput');
const userFilter=documents.getElementById('userFilter');
const postsContainer=documents.getElementById('postsContainer');
const sortButtons=documents.getElementById('sortButtons');
//fetching posts by api
async function fetchPosts(){
    try{
        const response=await fetch('');
        const posts=await response.json();
        allPosts=posts.slice(0,50);
        filteredPosts=[...allPosts];

        populateUserFilter();
        sortPosts();
        renderPosts();
    }
    catch(error)
    {
        postsContainer.innerHTML='<div class="no-results">Error loading posts. </div>';
        console.error('Error ')
    }
function populateUserFilter()
{
    const userIDs=[... new Set(allPosts.map(post=>post.userId))].sort((a,b)=>a-b);
    userFilter.innerHTML='<option value"">All Users</option>';
}
function sortPosts(){
    filteredPosts.sort((a,b)=>{
        switch(currentSort){
            case 'title-asc':
                return a.title.localCompare(b.title);
            case 'title-desc':
                return b.title.localCompare(a.title);
            case 'id-asc':
                return a.id-b.id;
            case 'id-desc':
                return b.id-a.id;
            default:
                return 0;    
        }
    });
}
//get border class o basis of user id
function getBorderClass(userId)
{
    if(userId<=3) return 'user-1';
    if(userId>=4 && userId<=7) return 'user-4';
    if(userId>=8) return 'user-8';
    return '';
}
function renderPosts(){
    if(filteredPosts.length===0)
    {
        posts.container.innerHTML='<div class="no-results">No posts found for the current criteria</div>';
        return;
    }
    const postsHTML=filteredPosts.map(post=>
        <div class="post-card ${getBorderClass(post.userId)}">
            <div class="post-id">Post #${post.id}</div>
            <div class="post-title">${post.title}</div>
            <div class="post-body">${post.id}</div>
            <div class="post-user">User #${post.userID}</div>
        </div>
    ).join('');
    postsContainer.innerHTML=`<div class="posts-grid>${postsHTML}</div>`;
}
//event listeners
searchInput.addEventListener('input',filterPosts);
userFilter.addEventListener('input',filterPosts);
sortButtons.forEach(button=>{
    button.addEventListener('click',()=>{
         
        })
    });
});
}

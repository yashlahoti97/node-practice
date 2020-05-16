console.log('Before');

// getUser(1) 
//     .then( user => getRepository(user.gitHubUsername))
//     .then( repos => getCommits(repos[0]))
//     .then( commits => console.log('Commits: ',commits))
//     .catch( err => console.log('Error: ',err.message));

async function displayCommits() { 
    try{   
        const user = await getUser(1);
        const repos = await getRepository(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch(err){
        console.log(err);
    }
}
displayCommits();
console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('Reading user from db...');
            resolve({ id: id, gitHubUsername: 'yash'});
        }, 2000);
    });
}

function getRepository(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1','repo2','repo3']);
        },2000);
    });
       
}

function getCommits(repository) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Finding commits...');
            resolve(['commit1','commit2','commit3']);
        },2000);
    }); 
}
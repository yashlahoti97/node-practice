console.log('Before');
getUser(1, getRepositories );
console.log('After');

function getRepositories (user) {
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
    console.log('Repos: ',repos);
    getCommits(repos, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout(()=>{
        console.log('Reading user from db...');
        callback({ id: id, gitHubUsername: 'yash'});
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callback(['repo1','repo2','repo3']);
    },2000);
}

function getCommits(repository, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callback(['commit1','commit2','commit3']);
    },2000);
}
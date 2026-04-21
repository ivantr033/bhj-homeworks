const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
const url = 'https://students.netoservices.ru/nestjs-backend/poll'

// GET Request
const xhrGet = new XMLHttpRequest();
xhrGet.open('GET', url);
xhrGet.responseType = 'json'; // We are waiting for a JSON
xhrGet.send();

xhrGet.onload = function() {
    if (xhrGet.status === 200) {
        const { id, data } = xhrGet.response;
        
        pollTitle.textContent = data.title;

        data.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'poll__answer';
            button.textContent = answer;

            button.onclick = () => {
                alert('Спасибо, ваш голос засчитан!');
                sendVote(id, index); // Send the vote using POST
            };

            pollAnswers.appendChild(button);
        });
    }
};

// Send de vote (POST) and show results
function sendVote(pollId, answerIndex) {
    const xhrPost = new XMLHttpRequest();
    xhrPost.open('POST', url);
    
    // It is mandatory to configure the header for form submissions
    xhrPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhrPost.responseType = 'json';
    
    // The data is sent as a text string
    xhrPost.send(`vote=${pollId}&answer=${answerIndex}`);

    xhrPost.onload = function() {
        if (xhrPost.status === 200 || xhrPost.status === 201) {
            displayResults(xhrPost.response.stat);
        }
    };
}

// RENDER THE STATISTICS
function displayResults(stats) {
    pollAnswers.innerHTML = '';
    
    const totalVotes = stats.reduce((sum, item) => sum + item.votes, 0);

    stats.forEach(item => {
        const percentage = ((item.votes / totalVotes) * 100).toFixed(2);
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `
            ${item.answer}: <strong>${percentage}%</strong>
        `;
        pollAnswers.appendChild(resultItem);
    });
}
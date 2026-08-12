const addCompany = document.getElementById('formCompany');
const companyName = document.getElementById('name');
const companyIndustry = document.getElementById('industry');
const companyWebsite = document.getElementById('website');

const addApplication = document.getElementById('formApplication');
const applicationCompanyID = document.getElementById('companyID');
const applicationRole = document.getElementById('role');
const applicationStatus = document.getElementById('status');
const applicationDate = document.getElementById('dateApplied');

const updateApplication = document.getElementById('formUpdateStatus');
const updateApplicationID = document.getElementById('applicationIdUpdate');
const updateApplicationStatus = document.getElementById('updatedStatus');

const addInterview = document.getElementById('formInterview');
const interviewApplicationID = document.getElementById('applicationIdInterview');
const interviewRound = document.getElementById('round');
const interviewNotes = document.getElementById('notes');
const interviewDate = document.getElementById('interviewDate');

const btnApplicationList = document.getElementById('btnListApplications');
const applicationsList = document.getElementById('applicationsList');

const btnFilterbyStatus = document.getElementById('btnFilterStatus');
const statusFilter = document.getElementById('filterStatusSelect');
const filteredList = document.getElementById('filteredList');

const btnInterviewsForApplication = document.getElementById('btnViewInterviews');
const applicationIDForInterviews = document.getElementById('interviewsAppId');
const listInterviewsForApplications = document.getElementById('interviewsList');

const btnCountStatus = document.getElementById('btnCountStatus');
const showCountStatus = document.getElementById('countList');

addCompany.addEventListener('submit', function(event) {
    event.preventDefault();
    let name = companyName.value;
    let industry = companyIndustry.value;
    let website = companyWebsite.value

    fetch('http://localhost:4000/companies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, industry, website})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Company Created: ', data);
    })
    .catch(err => {
        console.error('Error: ', err);
    });
});

addApplication.addEventListener('submit', function(event) {
    event.preventDefault();
    let companyID = applicationCompanyID.value;
    let role = applicationRole.value;
    let status = applicationStatus.value;
    let date = applicationDate.value;

    fetch('http://localhost:4000/applications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({company_id: companyID, role, status, date_applied: date})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Application Created: ', data);
    })
    .catch(err => {
        console.error('Error: ', err);
    });
});

updateApplication.addEventListener('submit', function(event) {
    event.preventDefault();
    let applicationID = updateApplicationID.value;
    let applicationStatusUpdate = updateApplicationStatus.value;

    fetch(`http://localhost:4000/applications/${applicationID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status: applicationStatusUpdate})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Application Updated: ', data);
    })
    .catch(err => {
        console.error('Error: ', err);
    });
});

addInterview.addEventListener('submit', function(event) {
    event.preventDefault();
    let interviewAppID = interviewApplicationID.value;
    let round = interviewRound.value;
    let notes = interviewNotes.value;
    let date = interviewDate.value;

    fetch('http://localhost:4000/interviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({application_id: interviewAppID, round, notes, date})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Interview Added: ', data);
    })
    .catch(err => {
        console.error('Error: ', err);
    });
});

btnApplicationList.addEventListener('click', function() {
    fetch('http://localhost:4000/applications')
    .then(response => response.json())
    .then(data => {
        applicationsList.innerHTML = '';
        data.forEach(app => {
            applicationsList.innerHTML += `<div class="card">${app.role} — ${app.name} — ${app.status}</div>`;
        });
    })   
    .catch(err => {
        console.error('Error: ', err);
    });
});

btnFilterbyStatus.addEventListener('click', function() {
    let statusValue = statusFilter.value;

    fetch(`http://localhost:4000/applications/status?status=${statusValue}`)
    .then(response => response.json())
    .then(data => {
        filteredList.innerHTML = '';
        data.forEach(app => {
            filteredList.innerHTML += `<div class="filterApp">${app.status} - ${app.name} - ${app.role}</div>`;
        });
    })
    .catch(err => {
        console.error('Error: ', err);
    });
});

btnInterviewsForApplication.addEventListener('click', function() {
    let appForInterviewID = applicationIDForInterviews.value;

    fetch(`http://localhost:4000/interviews/${appForInterviewID}`)
    .then(response => response.json())
    .then(data => {
        listInterviewsForApplications.innerHTML = '';
        data.forEach(app => {
            listInterviewsForApplications.innerHTML += `<div class="interviewsApplications">${app.round} - ${app.role} - ${app.name}</div>`;
        });
    })
    .catch(err => {
        console.error('Error: ', err);
    });
});

btnCountStatus.addEventListener('click', function() {
    fetch('http://localhost:4000/applications/status/group')
    .then(response => response.json())
    .then(data => {
        showCountStatus.innerHTML = '';
        data.forEach(app => {
            showCountStatus.innerHTML += `<div class="showCount">${app.status}: ${app.count}</div>`;
        });
    })
    .catch(err => {
        console.error('Error: ', err);
    });
});
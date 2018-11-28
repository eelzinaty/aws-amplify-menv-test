import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';

import awsconfig from './aws-exports';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);

const AnalyticsResult = document.getElementById('AnalyticsResult');
const AnalyticsEventButton = document.getElementById('AnalyticsEventButton');
let EventsSent = 0;
AnalyticsEventButton.addEventListener('click', (evt) => {
    Analytics.record('AWS Amplify Tutorial Event')
        .then( (evt) => {
            const url = 'https://console.aws.amazon.com/pinpoint/home/?region=us-east-1#/apps/'+awsconfig.aws_mobile_analytics_app_id+'/analytics/events';
            AnalyticsResult.innerHTML = '<p>Event Submitted.</p>';
            AnalyticsResult.innerHTML += '<p>Events sent: '+(++EventsSent)+'</p>';
            AnalyticsResult.innerHTML += '<a href="'+url+'" target="_blank">View Events on the Amazon Pinpoint Console</a>';
        });
});

const CognitoResult = document.getElementById('CognitoResult');
const CognitoCreateUserButton = document.getElementById('CognitoCreateUserButton');
const CognitoConfirmUserButton = document.getElementById('CognitoConfirmUserButton');
const CognitoConfirmUserInput = document.getElementById('CognitoConfirmUserInput');

CognitoCreateUserButton.addEventListener('click', (evt) => {
    Auth.signUp({
        username: 'issam',
        password: 'issam@1',
        attributes: {
            email: "issam+1@hatchapps.com", // optional
        },
        validationData: []  //optional
        })
        .then(data => {
            console.log(data);
            CognitoResult.innerHTML = JSON.stringify(data);
        })
        .catch(err => console.log(err));
});

CognitoConfirmUserButton.addEventListener('click', (evt) => {
    const code = CognitoConfirmUserInput.value;
    // After retrieveing the confirmation code from the user
    Auth.confirmSignUp('issam', code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true    
    })
    .then(data => {
        console.log(data);
        CognitoResult.innerHTML = JSON.stringify(data);
    })
    .catch(err => console.log(err));
});
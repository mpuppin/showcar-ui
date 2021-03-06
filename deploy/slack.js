#!/usr/bin/env node

const https = require('https');
const URL = require('url');
const querystring = require('querystring');

const slackUrl = URL.parse(process.env.SLACK_HOOK_URL);

const req = https.request({
    hostname: slackUrl.hostname,
    port: slackUrl.port,
    path: slackUrl.pathname,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}, res =>{

    res.setEncoding('utf8');
    const chunks = [];
    res.on('data', chunk => {
        chunks.push(chunk)
    });
    res.on('end', () => {
        console.log(chunks.join(''));
    });
});

const data = {
    channel: '#as24_web_experience',
    username: 'showcar-release',
    text: `@channel: New ShowCar UI release was done (master branch). See build here: <https://gitlab.com/web-experience/showcar-ui/pipelines/${process.env.CI_PIPELINE_ID}>`,
    link_names: 1,
    icon_emoji: ':tada:'
};

req.write(querystring.stringify({payload: JSON.stringify(data)}));

req.end();

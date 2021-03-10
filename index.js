const electron = require('electron');
const url = require('url');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { ipcMain } = require('electron');
const notifier = require('node-notifier');

const {app,BrowserWindow} = electron;

let mainWindow;

app.on('ready',function(){

    mainWindow = new BrowserWindow({});

    mainWindow.loadURL(url.format({
    pathname:path.join(__dirname,'mainwindow.html'),
    protocol:'file',
    slashes:true
    }));
});


const getDataFormRemote = async () => {
    const url = 'https:/www.cricbuzz.com/criccket-match/live-score';
    const response = await axios.get(URL);
    const {data} = response;
    return data;
}

const getScore = async () => {

    const html = await getDataFormRemote();

    const scores = [];
    const $ = cheerio.load(html);
    $('a.cb-lv-scrs-well-live').each(function(_,element){
        const scoreContainer = $(element).children().children();
        const score = $(scoreContainer).text();
        scores.push(score);
    })

    return scores;
}

ipcMain.on('scores',function(e,scores){
    console.log(scores[i]);
    mainWindow.webContents.send('scores',scores);
})



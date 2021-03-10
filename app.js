const electron = require('electron');
const url = require('url');
const path = require('path');
const notifier = require('node-notifier');
const { ipcRenderer } = require('electron');


ipcRenderer = require('electron').ipcRenderer;

ipcRender.on('scores',function(e,scores){
    for(let i = 0; i < scores.length; i++){
    console.log(scores[i]);
    }
})

    



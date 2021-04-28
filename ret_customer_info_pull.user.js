// ==UserScript==
// @author Chase Walker
// @description Pulls agent information from the agent search list in RET
// @name RET agent info pull
// @include *.socialadeng.com/home/admin/search
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

waitForKeyElements ('div.c-agentsearch__results', agentInfoCopy);

// gathers campaign IDs and sets each campaign name as a click-copy of it's ID
function agentInfoCopy (){
    var targetNodes = Object.values($('div.results-list-item'));
    targetNodes.forEach(function(v, i, a){
        if (!(v.className)){
            return;
        }
        var agentName = v.children[0].textContent
        var agentEmail = v.children[1].textContent
        var agentType = v.children[2].textContent
        var instanceName = window.location.hostname.split('.')[0]
        v.addEventListener('contextmenu', function(evt){clipboardCopy(
            'Instance Name: ' + instanceName + ',\n' + 'Agent Name: ' + agentName + ',\n' + 'Agent Email: ' + agentEmail + ',\n' + 'Agent Type: ' + agentType 
            ); evt.stopImmediatePropagation();})
    })
    return false;
}

// copies provided copy and creates an alert confirming what was copied
function clipboardCopy(copy){
    navigator.clipboard.writeText(copy).then(
        function(){
            alert("Copied: \n" + copy); // success
        })
        .catch(
        function() {
            alert("err"); // error
        });
    return false;
}
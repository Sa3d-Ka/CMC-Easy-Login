const $ = id => document.getElementById(id);

function saveOptions() {
    try {
        const username = $("username").value;
        const password = $("password").value;
        const autoLogin = $("autoLogin").checked;
        if (!username || !password) return alert("Please fill the fields.");
        const data = {
            username,
            password,
            autoLogin
        };
        chrome.storage.local.set(data, () => {
            $('status').textContent = 'Saved.';
            setTimeout(()=> $('status').textContent = '', 3000);
        });
    } catch (error) {
        console.log(error);
        alert("An error happened please post the issue in the github of yamadaMk12");
    }
}

function restoreOptions() {
    chrome.storage.local.get(['username', 'password', 'autoLogin'], (res) => {
        $("username").value = res.username || "";
        $("password").value = res.password || "";
        $("autoLogin").checked = res.autoLogin || false;
    });
    
}

function clearStored() {
    chrome.storage.local.remove(['username', 'password', 'autoLogin'], () => {
        $('status').textContent = 'Cleared.';
        setTimeout(()=> $('status').textContent = '', 3000);
    })
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("autoLogin");
}

document.addEventListener('DOMContentLoaded', restoreOptions);
$('save').addEventListener('click', saveOptions);
$('clear').addEventListener('click', clearStored);
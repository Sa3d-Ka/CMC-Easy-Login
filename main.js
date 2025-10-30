function validate(username, password) {
    const userValue = username.value.trim();
    const passValue = password.value.trim();

    if (!userValue || !passValue) {
        return { error: 'Please fill in all fields.' };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userValue)) {
        return { error: 'Please enter a valid email address.' };
    }

    if (passValue.length < 8) {
        return { error: 'Password must be at least 8 characters long.' };
    }

    return { username: userValue, password: passValue };
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const autoLogin = document.getElementById("autoLogin").checked;

    const result = validate(username, password);

    if (result.error) {
        alert(result.error);
        return;
    }

    const data = {
        username: result.username,
        password: result.password,
        autoLogin
    };

    console.log('Form data ready to send:', data);

    chrome.storage.local.set(data, () => {
        document.getElementById('status').textContent = 'Saved.';
        setTimeout(() => document.getElementById('status').textContent = '', 3000);
    });
});

function restoreOptions() {
    chrome.storage.local.get(['username', 'password', 'autoLogin'], (res) => {
        document.getElementById("username").value = res.username || "";
        document.getElementById("password").value = res.password || "";
        document.getElementById("autoLogin").checked = res.autoLogin || false;
    });
    
}

function clearStored() {
    chrome.storage.local.remove(['username', 'password', 'autoLogin'], () => {
        document.getElementById('status').textContent = 'Cleared.';
        setTimeout(()=> document.getElementById('status').textContent = '', 3000);
    })
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("autoLogin");
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('clear').addEventListener('click', clearStored);
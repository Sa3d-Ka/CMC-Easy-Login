(async function() {
  try {
   
    const url = new URL(window.location.href);
    if (!url.pathname.includes('/cgi-bin/login')) return;
    const stored = await new Promise(resolve =>
      chrome.storage.local.get(['username', 'password', 'autoLogin'], res => resolve({
        username: res.username,
        password: res.password,
        autoLogin: res.autoLogin 
      } || {}))
    );

    if (!stored) {
      console.log('No config present.');
      return;
    }

    if (!stored.username || !stored.password) {
      console.log('No credentials saved.');
      return;
    }

    const params =new URLSearchParams({
      'user': stored.username,
      'password': stored.password,
      'email': '',
      'cmd': 'authenticate',
      'agreementAck': 'Accept'
     })
    
    const postUrl = url.origin + url.pathname;  
    const response = await fetch(postUrl, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString(),
      redirect: 'follow'
    });

    const data = await response.text();
    document.open();
    document.write(data);
    document.close();

  } catch (err) {
    alert("An error happened please post the issue in the github of yamadaMk12");
    console.log(err)
  }
})();

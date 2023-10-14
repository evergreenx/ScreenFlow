

chrome.runtime.onInstalled.addListener(({reason}) => {

  console.log(reason)
    if (reason === 'install') {
      chrome.tabs.create({
        url: "onboarding.html"
      });
    }
  });
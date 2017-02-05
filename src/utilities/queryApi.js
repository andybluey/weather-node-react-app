// Need to setup to call the API and export as JSON to App.js
// Will need to setup checks

export function checkStatus(res) {
  if (!res.ok) {
    const err = new Error(res.statusText||res.status);
    err.res = res;
    throw err;
  }
  return res;
}

export function parseJson(res) {
  return res.json();
}

export default function callApi(url, config, onSuccessfulLoad, onFailureToLoad) {
  fetch(url, config)
    .then(checkStatus).catch((err)=>{
      throw err;
    })
    .then(parseJson)
    .then((json) => {
      onSuccessfulLoad(json);
    }).catch((err) => {
      const res = err.response;
      if (res === undefined) {
        onFailureToLoad(err);
      } else {
        err.status = res.status;
        err.text = res.statusText;
        res.text().then( (text) => {
          try {
            const json = JSON.parse(text);
            err.message = json.message;
          } catch (ex) {
            err.message = text;
          }
          onFailureToLoad(err);
        });
      }
    });
}

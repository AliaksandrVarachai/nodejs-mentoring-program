import fetchAuthorized from './fetch-authorized.js';
import configUrl from './config.json';
import './styles.css';

const dataNode = document.getElementById('data-section');
const errorNode = document.getElementById('error-section');
const usersInfoBt = document.getElementById('users-info-bt');
const groupsInfoBt = document.getElementById('groups-info-bt');
const permissionsInfoBt = document.getElementById('permissions-info-bt');

function showError(message) {
  errorNode.innerText = message;
}

function clearError() {
  errorNode.innerText = '';
}

/**
 * Forms a list of array elements.
 * @param {{id: string, value:string}[]} array
 * @param {function?} clickHandler - function with param (value: string) which process click action.
 */
function generateList(array, clickHandler) {
  dataNode.innerText = '';
  const select = document.createElement('select');
  if (clickHandler) {
    select.onclick = function(event) {
      clickHandler(event.target.value);
    }
  }
  array.forEach(({ id, text }) => {
    const option = document.createElement('option');
    option.value = id;
    option.innerText = text;
    select.appendChild(option);
  });
  select.appendChild(dataNode);
}

(async () => {
  const fetchConfig = await fetch(configUrl);

  let apiUrl;
  try {
    const config = await fetchConfig;
    if (!config.ok) {
      showError('Config file is not downloaded');
      return;
    }
    const json = await config.json();
    apiUrl = json.apiUrl;
  } catch(e) {
    showError(e.message);
    return;
  }

  usersInfoBt.onclick = async function() {
    clearError()
    const request = new Request(`${apiUrl}/users/all`, { method: 'GET' });
    let json;
    try {
      json = await fetchAuthorized(request);
    } catch(error) {
      showError(error.message);
      return;
    }
    const { data } = json;
    dataNode.innerText = JSON.stringify(data, null, 4);
  }

  groupsInfoBt.onclick = async function() {
  }

  permissionsInfoBt.onclick = async function() {
  }
})()

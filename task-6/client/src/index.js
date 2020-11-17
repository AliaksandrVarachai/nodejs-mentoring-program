import authorizedFetch from './authorized-fetch.js';
import configUrl from './config.json';
import './styles.css';

const selectOutputRows = 30;

const dataNode1 = document.getElementById('data-section-1');
const dataNode2 = document.getElementById('data-section-2');
const dataNode3 = document.getElementById('data-section-3');
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
 * @param {HTMLElement} node - node where the data should be added to.
 * @param {{id: string, value:string}[]} array
 * @param {function?} clickHandler - function with param (value: string) which process click action.
 */
function showListInNode(node, array, clickHandler) {
  node.innerText = '';
  if (array.length < 1) {
    node.innerText = 'No data';
    return;
  }
  const select = document.createElement('select');
  select.size = selectOutputRows;
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
  node.appendChild(select);
}

(async () => {
  const fetchConfig = await fetch(configUrl.toString());

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
      json = await authorizedFetch(request);
    } catch(error) {
      showError(error.message);
      return;
    }
    const { data } = json;
    const users = data.map(({ userId, isDeleted, login, age }) => ({
      id: userId,
      text: `${login}, ${age}`
    }));
    showListInNode(dataNode1, users, async (id) => {
      const userGroupsRequest = new Request(`${apiUrl}/user-groups/${id}`);
      const userPermissionsRequest = new Request(`${apiUrl}/user-permissions/${id}`);
      let array;
      try {
        array = await Promise.all([
          authorizedFetch(userGroupsRequest),
          authorizedFetch(userPermissionsRequest)
        ]);
      } catch (error) {
        showError(error.message);
      }
      const [ groupsJson, permissionsJson ] = array;
      const groups = groupsJson.data.map(id => ({
        id,
        text: id
      }));
      const permissions = permissionsJson.data.map(id => ({
        id,
        text: id
      }));
      showListInNode(dataNode2, groups)
      showListInNode(dataNode3, permissions)
    });
  }

  groupsInfoBt.onclick = async function() {
  }

  permissionsInfoBt.onclick = async function() {
  }
})()

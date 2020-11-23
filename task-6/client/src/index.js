import authorizedFetch from './authorized-fetch.js';
import configUrl from './config.json';
import './styles.css';

const selectMaxOutputRows = 30;

const dataNode1 = document.getElementById('data-section-1');
const dataNode2 = document.getElementById('data-section-2');
const dataNode3 = document.getElementById('data-section-3');
const dataHeaderNode1 = document.getElementById('data-header-section-1');
const dataHeaderNode2 = document.getElementById('data-header-section-2');
const dataHeaderNode3 = document.getElementById('data-header-section-3');
const errorNode = document.getElementById('error-section');
const usersInfoBt = document.getElementById('users-info-bt');
const groupsInfoBt = document.getElementById('groups-info-bt');
const permissionsInfoBt = document.getElementById('permissions-info-bt');
const instructionsNode = document.getElementById('instructions');

function showError(message) {
  errorNode.innerText = message;
}

function clearError() {
  errorNode.innerText = '';
}

function updateInstructions(text) {
  instructionsNode.innerText = text;
}

/**
 * Forms a list of array elements.
 * @param {HTMLElement} node - node where the data should be added to.
 * @param {{id: string, value:string}[]} array
 * @param {function?} clickHandler - function with param (value: string) which process click action.
 */
function showListInNode(node, title, array, clickHandler) {
  const dataHeaderNode = node.querySelector('.data-header');
  const dataNode = node.querySelector('.data');

  dataHeaderNode.innerText = title;
  if (array.length < 1) {
    dataNode.innerText = 'No data';
    return;
  }

  dataNode.innerText = '';
  const select = document.createElement('select');
  select.size = array.length < selectMaxOutputRows ? array.length : selectMaxOutputRows;
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
  dataNode.appendChild(select);
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
    clearError();
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
    updateInstructions('Click any user for group / permission details:')
    showListInNode(dataNode1, 'Users list', users, async (id) => {

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
      const groups = groupsJson.data.map(({ id, name }) => ({
        id,
        text: name
      }));
      const permissions = permissionsJson.data.map(({ id, name }) => ({
        id,
        text: name
      }));
      showListInNode(dataNode2, 'Groups list', groups);
      showListInNode(dataNode3, 'Permissions list', permissions);
    });
  }

  groupsInfoBt.onclick = async function() {
  }

  permissionsInfoBt.onclick = async function() {
  }
})()

import chai from 'chai';
import sinon from 'sinon';
import * as controllers from '../../src/controllers/index.js';

const { expect } = chai;
const {
  mockConfig,
  mockLoggedServiceProvider,
  mockViews, mockAuthTokenUtils
} = controllers;

const testUser1 = {
  userId: 'userId1',
  isDeleted: false,
  login: 'test1',
  password: 'test1',
  age: 11
};
const testUser2 = {
  userId: 'userId2',
  isDeleted: false,
  login: 'test2',
  password: 'test2',
  age: 22
};
const allUsers = [testUser1, testUser2];

const testGroup1 = {
  groupId: 'groupId1',
  name: 'group1'
};
const testGroup2 = {
  groupId: 'groupId2',
  name: 'group2'
};
const allGroups = [testGroup1, testGroup2];

const testPermission1 = {
  permissionId: 'permissionId1',
  name: 'permission1'
};
const testPermission2 = {
  permissionId: 'permissionId2',
  name: 'permission2'
};
const allPermissions = [testPermission1, testPermission2];

const mockedConfig = {
  pageLoginUrl: 'http://test.com/login.html'
};
const mockedViews = {
  getSuccessView: sinon.stub().callsFake(data => ({ data })),
  getSuccessLoginView: sinon.stub().returns({ accessToken: 'token', refreshToken: 'token' }),
  getSuccessRefreshView: sinon.stub().returns({ accessToken: 'token' }),
  getErrorView: sinon.stub().callsFake(message => ({ error: { message } })),
  getLoginUrlErrorView: sinon.stub().returns({ error: { message: 'error' }, redirectUrl: 'http://foo.com' })
};
const mockedTokenUtils = {
  generateAccessToken: sinon.stub().returns('token'),
  generateAccessAndRefreshTokens: sinon.stub().returns({ accessToken: 'token', refreshToken: 'token' }),
  getTokenPayload: sinon.stub().returns({ sub: 'user', exp: 100 })
};

function MockedResponse() {
  this.status = sinon.stub().returns(this);
  this.sendStatus = sinon.stub().returns(this);
  this.json = sinon.stub().returns(this);
}

describe('Controllers', function () {
  before(function () {
    mockConfig(mockedConfig);
    mockViews(mockedViews);
    mockAuthTokenUtils(mockedTokenUtils);
  });

  after(function () {
    mockConfig();
    mockLoggedServiceProvider();
    mockViews();
    mockAuthTokenUtils();
  });

  describe('getAllUsers()', function () {
    const req = {};

    it('should response with the list of all users', async function () {
      mockLoggedServiceProvider({
        getAllUsers: () => async () => allUsers
      });
      const res = new MockedResponse();
      await controllers.getAllUsers(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: allUsers })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getAllUsers: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getAllUsers(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getUserById()', function () {
    const req = {
      params: { id: 'userId' }
    };

    it('should response with the user info', async function () {
      mockLoggedServiceProvider({
        getUserById: () => async () => testUser1
      });
      const res = new MockedResponse();
      await controllers.getUserById(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: testUser1 })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getUserById: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getUserById(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getAutoSuggestUsers()', function () {
    const req = {
      query: {
        'login-substring': 'userId',
        limit: 10
      }
    };

    it('should response with the suggested user list', async function () {
      mockLoggedServiceProvider({
        getAutoSuggestUsers: () => async () => allUsers
      });
      const res = new MockedResponse();
      await controllers.getAutoSuggestUsers(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: allUsers })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getAutoSuggestUsers: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getAutoSuggestUsers(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('createUser()', function () {
    const req = {
      body: {
        login: 'login',
        password: 'password',
        age: 22
      }
    };

    it('should response with data about the created user', async function () {
      mockLoggedServiceProvider({
        createUser: () => async () => testUser1
      });
      const res = new MockedResponse();
      await controllers.createUser(req, res);
      expect(res.status.lastCall.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ data: testUser1 })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        createUser: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.createUser(req, res);
      expect(res.status.lastCall.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('updateUser()', function () {
    const req = {
      body: {
        id: 'userId',
        password: 'password',
        age: 22,
        isDeleted: false
      }
    };

    it('should response with data about the updated user', async function () {
      mockLoggedServiceProvider({
        updateUser: () => async () => testUser1
      });
      const res = new MockedResponse();
      await controllers.updateUser(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: testUser1 })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        updateUser: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.updateUser(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('removeUser()', function () {
    const req = {
      params: { id: 'userId' }
    };

    it('should response that the user is removed', async function () {
      mockLoggedServiceProvider({
        removeUser: () => async () => null
      });
      const res = new MockedResponse();
      await controllers.removeUser(req, res);
      expect(res.sendStatus.calledWith(204)).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        removeUser: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.removeUser(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('createGroup()', function () {
    const req = {
      body: { name: 'group-name' }
    };

    it('should response with data about the created group', async function () {
      mockLoggedServiceProvider({
        createGroup: () => async () => testGroup1
      });
      const res = new MockedResponse();
      await controllers.createGroup(req, res);
      expect(res.status.lastCall.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ data: testGroup1 })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        createGroup: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.createGroup(req, res);
      expect(res.status.lastCall.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('deleteGroup()', function () {
    const req = {
      params: { id: 'groupId' }
    };

    it('should response with data about the deleted group', async function () {
      mockLoggedServiceProvider({
        deleteGroup: () => async () => testGroup1
      });
      const res = new MockedResponse();
      await controllers.deleteGroup(req, res);
      expect(res.sendStatus.calledWith(204)).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        deleteGroup: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.deleteGroup(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getGroupById()', function () {
    const req = {
      params: { id: 'groupId' }
    };

    it('should response with data about the requested group', async function () {
      mockLoggedServiceProvider({
        getGroupById: () => async () => testGroup1
      });
      const res = new MockedResponse();
      await controllers.getGroupById(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: testGroup1 })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getGroupById: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getGroupById(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getAllGroups()', function () {
    const req = {};

    it('should response with the group list', async function () {
      mockLoggedServiceProvider({
        getAllGroups: () => async () => allGroups
      });
      const res = new MockedResponse();
      await controllers.getAllGroups(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: allGroups })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getAllGroups: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getAllGroups(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('createPermission()', function () {
    const req = {
      body: { name: 'permission-name' }
    };

    it('should response with data about the created permission', async function () {
      mockLoggedServiceProvider({
        createPermission: () => async () => testPermission1
      });
      const res = new MockedResponse();
      await controllers.createPermission(req, res);
      expect(res.status.lastCall.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ data: testPermission1 })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        createPermission: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.createPermission(req, res);
      expect(res.status.lastCall.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('deletePermission()', function () {
    const req = {
      params: { id: 'permissionId' }
    };

    it('should response with data about the deleted permission', async function () {
      mockLoggedServiceProvider({
        deletePermission: () => async () => testPermission1
      });
      const res = new MockedResponse();
      await controllers.deletePermission(req, res);
      expect(res.sendStatus.calledWith(204)).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        deletePermission: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.deletePermission(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getPermissionById()', function () {
    const req = {
      params: { id: 'permissionId' }
    };

    it('should response with data about the requested permission', async function () {
      mockLoggedServiceProvider({
        getPermissionById: () => async () => testPermission1
      });
      const res = new MockedResponse();
      await controllers.getPermissionById(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: testPermission1 })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getPermissionById: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getPermissionById(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getAllPermissions()', function () {
    const req = {};

    it('should response with the permissions list', async function () {
      mockLoggedServiceProvider({
        getAllPermissions: () => async () => allPermissions
      });
      const res = new MockedResponse();
      await controllers.getAllPermissions(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: allPermissions })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getAllPermissions: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getAllPermissions(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('addUsersToGroup()', function () {
    const req = {
      body: {
        groupId: 'groupId',
        userIds: ['userId1', 'userId2']
      }
    };

    it('should response with a list of just added users to the group', async function () {
      mockLoggedServiceProvider({
        addUsersToGroup: () => async () => req.body.userIds
      });
      const res = new MockedResponse();
      await controllers.addUsersToGroup(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: req.body.userIds })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        addUsersToGroup: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.addUsersToGroup(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('deleteUsersFromGroup()', function () {
    const req = {
      body: {
        groupId: 'groupId',
        userIds: ['userId1', 'userId2']
      }
    };

    it('should response with a list of just deleted users from the group', async function () {
      mockLoggedServiceProvider({
        deleteUsersFromGroup: () => async () => req.body.userIds
      });
      const res = new MockedResponse();
      await controllers.deleteUsersFromGroup(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: req.body.userIds })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        deleteUsersFromGroup: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.deleteUsersFromGroup(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('addPermissionsToGroup()', function () {
    const req = {
      body: {
        groupId: 'groupId',
        permissionIds: ['permissionId1', 'permissionId2']
      }
    };

    it('should response with a list of just added permissions to the group', async function () {
      mockLoggedServiceProvider({
        addPermissionsToGroup: () => async () => req.body.permissionIds
      });
      const res = new MockedResponse();
      await controllers.addPermissionsToGroup(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: req.body.permissionIds })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        addPermissionsToGroup: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.addPermissionsToGroup(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('deletePermissionsFromGroup()', function () {
    const req = {
      body: {
        groupId: 'groupId',
        permissionIds: ['permissionId1', 'permissionId2']
      }
    };

    it('should response with a list of just deleted permissions from the group', async function () {
      mockLoggedServiceProvider({
        deletePermissionsFromGroup: () => async () => req.body.permissionIds
      });
      const res = new MockedResponse();
      await controllers.deletePermissionsFromGroup(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: req.body.permissionIds })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        deletePermissionsFromGroup: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.deletePermissionsFromGroup(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getUserPermissions()', function () {
    const req = {
      params: { id: 'userId' }
    };

    it('should response with list of permissions for the provided user', async function () {
      mockLoggedServiceProvider({
        getUserPermissions: () => async () => allPermissions
      });
      const res = new MockedResponse();
      await controllers.getUserPermissions(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: allPermissions })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getUserPermissions: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getUserPermissions(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getUserGroups()', function () {
    const req = {
      params: { id: 'userId' }
    };

    it('should response with the list of groups for the provided user', async function () {
      mockLoggedServiceProvider({
        getUserGroups: () => async () => allGroups
      });
      const res = new MockedResponse();
      await controllers.getUserGroups(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: allGroups })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getUserGroups: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getUserGroups(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getGroupUsers()', function () {
    const req = {
      params: { id: 'groupId' }
    };

    it('should response with the list of users for the provided group', async function () {
      mockLoggedServiceProvider({
        getGroupUsers: () => async () => allUsers
      });
      const res = new MockedResponse();
      await controllers.getGroupUsers(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: allUsers })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getGroupUsers: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getGroupUsers(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getGroupPermissions()', function () {
    const req = {
      params: { id: 'groupId' }
    };

    it('should response with the list of permissions for the provided group', async function () {
      mockLoggedServiceProvider({
        getGroupPermissions: () => async () => allPermissions
      });
      const res = new MockedResponse();
      await controllers.getGroupPermissions(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: allPermissions })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getGroupPermissions: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getGroupPermissions(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getPermissionGroups()', function () {
    const req = {
      params: { id: 'permissionId' }
    };

    it('should response with the list of groups for the provided permission', async function () {
      mockLoggedServiceProvider({
        getPermissionGroups: () => async () => allGroups
      });
      const res = new MockedResponse();
      await controllers.getPermissionGroups(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: allGroups })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getPermissionGroups: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getPermissionGroups(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getPermissionUsers()', function () {
    const req = {
      params: { id: 'permissionId' }
    };

    it('should response with the list of users for the provided permission', async function () {
      mockLoggedServiceProvider({
        getPermissionUsers: () => async () => allUsers
      });
      const res = new MockedResponse();
      await controllers.getPermissionUsers(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: allUsers })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getPermissionUsers: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getPermissionUsers(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });

  describe('getPermissionUsers()', function () {
    const req = {
      params: { id: 'permissionId' }
    };

    it('should response with the list of users for the provided permission', async function () {
      mockLoggedServiceProvider({
        getPermissionUsers: () => async () => allUsers
      });
      const res = new MockedResponse();
      await controllers.getPermissionUsers(req, res);
      expect(res.status.lastCall.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ data: allUsers })).to.be.true;
    });

    it('should process errors and send the error message', async function () {
      mockLoggedServiceProvider({
        getPermissionUsers: () => async () => { throw Error('error'); }
      });
      const res = new MockedResponse();
      await controllers.getPermissionUsers(req, res);
      expect(res.status.lastCall.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: { message: 'error' } })).to.be.true;
    });
  });
});

import Mock from 'mockjs';

Mock.mock('/user/info', 'get', () => {
  return {
    code: 200,
    success: true,
    message: '请求成功',
    data: {
      id: '0000000001',
      username: 'admin',
      sex: 'male',
      age: 18,
      address: '北京市',
      phone: '12345678901'
    }
  };
});

Mock.mock('/user/login', 'post', () => {
  return {
    data: {
      accessToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjE2YWJkNTlkOTAxNzQwZDliYmI3ZjczODBhZDkyNzNhIiwidXNlcklkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZGVwdElkIjoxLCJkYXRhU2NvcGUiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiZXhwIjoxNjkxMTAzMzgyfQ.P4cuIfmPepl3HuguhMS7NXn5a7IUPpsLbmtA_rHOhHk',
      tokenType: 'Bearer',
      refreshToken: null,
      expires: null
    }
  };
});
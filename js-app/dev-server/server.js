import express from 'express';
const app = express();
const port = 3001;

app.post('/login', (req, res) => {
  res.statusCode = 401;
  res.send({token: 'From_dev_server'});
});

app.post('/register', (req, res) => {
  res.statusCode = 422;
  res.send({errors: [{field: 'email', message: 'Error'},
    {field: 'email', message: 'Error1'},
    {field: 'email', message: 'Error2'},
    {field: 'password', message: 'Error1'}]});
});

app.get('/getUser', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({userProfile: {username: 'oleksandr', rootFolderId: '1'}});
  }, 1000);
});

app.get('/getFolder/1', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({currentFolder: {name: 'home', id: '1', parentId: null}});
  }, 1000);
});

app.get('/getFolder/folder3', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({currentFolder: {name: 'Kyiv 2022', id: 'folder3', parentId: '1'}});
  }, 1000);
});

app.get('/getFolder/folder4', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({currentFolder: {name: 'Montenegro 2022', id: 'folder4', parentId: 'folder3'}});
  }, 1000);
});

app.get('/getFolder/folder5', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({currentFolder: {name: 'England 2002', id: 'folder5', parentId: 'folder4'}});
  }, 1000);
});

app.get('/getFolder/1/content', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({folderContent: [
      {name: 'Kyiv 2022', id: 'folder3', parentId: '1', type: 'Folder', size: null},
      {name: 'Not Your Ordinary', id: '20', parentId: '2', type: 'mp3', size: '32 MB'},
     ]});
  }, 1000);
});

app.get('/getFolder/folder3/content', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({folderContent: [
      {name: 'Montenegro 2019', id: 'folder4', parentId: 'folder3', type: 'Folder', size: null},
      {name: 'Not Your Ordinary', id: '20', parentId: '2', type: 'mp3', size: '32 MB'},
      {name: 'Passport', id: '15', parentId: '2', type: 'pdf', size: '64 MB'}]});
  }, 1000);
});

app.get('/getFolder/folder4/content', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({folderContent: [
      {name: 'England 2002', id: 'folder5', parentId: 'folder4', type: 'Folder', size: null},
      {name: 'Not Your Ordinary', id: '20', parentId: '2', type: 'mp3', size: '32 MB'},
    ]});
  }, 1000);
});

app.get('/getFolder/folder5/content', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({folderContent: [
      {name: 'Not Your Ordinary', id: '20', parentId: '2', type: 'mp3', size: '32 MB'},
      {name: 'Passport', id: '15', parentId: '2', type: 'pdf', size: '64 MB'}]});
  }, 1000);
});

app.listen(port, () => {});

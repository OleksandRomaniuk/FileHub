import express from 'express';
const app = express();
const port = 3001;

app.post('/login', (req, res) => {
  res.send({token: 'From_dev_server'});
});
app.get('/user', (req, res)=>{
  res.status(200);
  setTimeout(()=>{
    res.send({
      userProfile: {
        username: 'alex',
        rootFolderId: 'folder1',
      }});
  }, 1000);
});
const foldersInfo = {
  'folder1': {
    name: 'home',
    id: 'folder1',
    parentId: null,
    itemsAmount: 3,
  },
  'folder2': {
    name: 'Weather',
    id: 'folder2',
    parentId: 'folder1',
    itemsAmount: 3,
  },
  'folder3': {
    name: 'My Trip',
    id: 'folder3',
    parentId: 'folder1',
    itemsAmount: 3,
  },
  'folder5': {
    name: 'Bali',
    id: 'folder5',
    parentId: 'folder3',
    itemsAmount: 3,
  },
};
const foldersContent = {
  'folder1': {
    items: [
      {
        type: 'folder',
        name: 'Montenegro',
        size: null,
        id: 'folder2',
      },
      {
        type: 'folder',
        name: 'My Trip',
        size: null,
        id: 'folder3',
      },
      {
        type: 'PDF Document',
        name: 'HTML_guidelines.pdf',
        size: '100 KB',
        id: 'file4',
      },
    ],
  },
  'folder2': {
    items: [
      {
        type: 'folder',
        name: 'Bali',
        size: null,
        id: 'folder5',
      },
      {
        type: 'folder',
        name: 'Study',
        size: null,
        id: 'folder6',
      },
      {
        type: 'PDF Document',
        name: 'Laboratory work.pdf',
        size: '500 KB',
        id: 'file7',
      },
    ],
  },
  'folder3': {
    items: [
      {
        type: 'folder',
        name: 'Ukraine',
        size: null,
        id: 'folder8',
      },
      {
        type: 'folder',
        name: 'Work',
        size: null,
        id: 'folder9',
      },
      {
        type: 'PDF Document',
        name: 'Holidays.pdf',
        size: '500 KB',
        id: 'file10',
      },
    ],
  },
  'folder5': {
    items: [
      {
        type: 'folder',
        name: 'USA',
        size: null,
        id: 'folder11',
      },
      {
        type: 'folder',
        name: 'Poland',
        size: null,
        id: 'folder12',
      },
      {
        type: 'PDF Document',
        name: 'Holidays.pdf',
        size: '500 KB',
        id: 'file13',
      },
    ],
  },
};
app.get('/folders/:folderId', (req, res) => {
  setTimeout(() => {
    if (foldersInfo[req.params['folderId']]) {
      res.status(200);
      res.send({
        folderInfo: foldersInfo[req.params['folderId']],
      });
    } else {
      res.status(404);
      res.send({});
    }
  }, 500);
});
app.get('/folders/:folderId/content', (req, res) => {
  setTimeout(() => {
    if (foldersContent[req.params['folderId']]) {
      res.status(200);
      res.send({folderContent: foldersContent[req.params['folderId']]});
    } else {
      res.status(404);
      res.send({});
    }
  }, 500);
});

app.post('/register', (req, res) => {
  res.status(200);
});

app.delete('/file/:fileId', (req, res) => {
  setTimeout(()=>{
    Object.entries(foldersContent).forEach(([folderId, contentArray]) => {
      contentArray.items.forEach((file, index)=>{
        if (file.id === req.params.fileId) {
          foldersContent[folderId].items.splice(index, 1);
        }
      });
    });
    res.status(200);
    res.send({});
  }, 500);
});
app.delete('/folder/:folderId', (req, res) => {
  setTimeout(()=>{
    Object.entries(foldersContent).forEach(([folderId, contentArray]) => {
      contentArray.items.forEach((file, index)=>{
        if (file.id === req.params.folderId) {
          foldersContent[folderId].items.splice(index, 1);
        }
      });
    });
    res.status(200);
    res.send({});
  }, 500);
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('server is up.');
});

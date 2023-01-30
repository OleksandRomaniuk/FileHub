import express from 'express';
import bodyParser from 'body-parser';
import formidable from 'formidable';

const port = 3001;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const rand = function() {
  return Math.random().toString(36).substr(2); // remove `0.`
};

let token = rand() + rand();

app.post('/login', (req, res) => {
  res.send({token: token});
});
app.get('/user', (req, res)=> {
  setTimeout(()=>{
    if (req.headers.authorization.split(' ')[1] === token) {
      res.status(200);
      res.send({
        userProfile: {
          username: 'alex',
          rootFolderId: 'folder1',
        }});
    } else {
      res.status(401);
      res.send({});
    }
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
};
const foldersContent = {
  'folder1': {
    items: [
      {
        type: 'folder',
        name: 'Montenegro',
        size: null,
        id: 'folder2',
        parentId: 'folder1',
      },
      {
        type: 'folder',
        name: 'My Trip',
        size: null,
        id: 'folder3',
        parentId: 'folder1',
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
        parentId: 'folder2',
      },
      {
        type: 'folder',
        name: 'Study',
        size: null,
        id: 'folder6',
        parentId: 'folder2',
      },
      {
        type: 'file',
        mimetype: 'application/pdf',
        name: 'Laboratory work.pdf',
        size: '500000',
        id: 'file7',
        parentId: 'folder2',
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
        parentId: 'folder3',
      },
      {
        type: 'folder',
        name: 'Work',
        size: null,
        id: 'folder9',
        parentId: 'folder3',
      },
      {
        type: 'file',
        mimetype: 'application/pdf',
        name: 'Holidays.pdf',
        size: '500 KB',
        id: 'file10',
        parentId: 'folder3',
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
        parentId: 'folder5',
      },
      {
        type: 'folder',
        name: 'Poland',
        size: null,
        id: 'folder12',
        parentId: 'folder5',
      },
      {
        type: 'file',
        mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        name: 'Repoty.pdf',
        size: '500000',
        id: 'file13',
        parentId: 'folder5',
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
app.get('/folders/:folderId/content/:name', (req, res) => {
  setTimeout(() => {
    const name = req.params.name.toLowerCase();
    if (foldersContent[req.params['folderId']]) {
      const result = foldersContent[req.params['folderId']].items
        .filter((item )=> item.name.toLowerCase().includes(name));
      res.status(200);
      res.send({folderContent: {items: result}});
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
app.post('/folder/:folderId/content', (req, res) => {
  let id = 0;
  setTimeout(()=>{
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      if (err != null) {
        return res.status(400).json({message: err.message});
      }
      const [firstFileName] = Object.keys(files);

      Object.entries(files).forEach(([, file])=>{
        Object.entries(foldersContent).forEach(([folderId, contentArray]) => {
          if (folderId === req.params.folderId) {
            const fileItem = {
              type: 'file',
              mimetype: file.mimetype,
              name: file.originalFilename,
              size: file.size,
              id: 'file - ' + ++id,
              parentId: req.params.folderId,
            };
            contentArray.items.push(fileItem);
          }
        });
      });
      res.json({filename: firstFileName});
    });
  }, 5000);
});
app.put('/folder/:folderId', (req, res) => {
  setTimeout(()=>{
    let flag;
    Object.entries(foldersContent).forEach(([folderId, contentArray]) => {
      contentArray.items.forEach((item, index)=>{
        if (item.type === 'folder' && item.id === req.params.folderId) {
          foldersContent[folderId].items[index].name = req.body.name;
          flag = true;
        }
      });
    });
    if (flag) {
      res.status(200);
      res.send({});
    } else {
      res.status(404);
      res.send({error: `file doesn't exist`});
    }
  }, 1000);
});
app.put('/file/:fileId', (req, res) => {
  setTimeout(()=>{
    let flag;
    Object.entries(foldersContent).forEach(([folderId, contentArray]) => {
      contentArray.items.forEach((item, index)=>{
        if (item.type !== 'folder' && item.id === req.params.fileId) {
          foldersContent[folderId].items[index].name = req.body.name;
          flag = true;
        }
      });
    });
    if (flag) {
      res.status(200);
      res.send({});
    } else {
      res.status(404);
      res.send({error: `file doesn't exist`});
    }

    // res.status(422);
    // res.send({
    //   errors: [{
    //     field: 'input',
    //     message: 'file doesn\'t exist',
    //   }],
    // });
  }, 3000);
});
let id = 0;
app.post('/folders', (req, res) => {
  setTimeout(()=>{
    const tempId = 'folder-'+ ++id;
    const newFolder = {...req.body, id: tempId};

    foldersInfo[tempId] = newFolder;

    Object.entries(foldersContent).forEach(([folderId, contentArray]) => {
      if (folderId === req.body.parentId) {
        contentArray.items.push(newFolder);
      }
    });
    foldersContent[tempId] = {
      items: [],
    };
    res.status(200);
    res.send(newFolder);
  }, 5000);
});
app.get('/files/:id', (req, res)=>{
  setTimeout(()=>{
    res.download('./dev-server/files/test.txt');
    res.status(200);
  }, 500);
});
app.post('/logout', (req, res) => {
  token = rand() + rand();
  res.status(200);
  res.send({});
});
app.listen(port, () => {
  console.log('server is up.');
});

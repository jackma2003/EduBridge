db = db.getSiblingDB('admin');
db.auth('root', 'example');

db = db.getSiblingDB('edubridge_users');
db.createUser({
  user: 'edubridge_user',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'edubridge_users' }]
});

db = db.getSiblingDB('edubridge_courses');
db.createUser({
  user: 'edubridge_user',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'edubridge_courses' }]
});

db = db.getSiblingDB('edubridge_content');
db.createUser({
  user: 'edubridge_user',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'edubridge_content' }]
});
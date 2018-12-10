insert into users
  (name, email, username, password)
  values
    ('Lorenzo', 'lorenzo@mail.com', 'zo', 'lorenzo');

insert into todos
  (content, user_id)
  values
    ('Find the kids', 1),
    ('Cook some dinner', 1),
    ('Eat the dinner', 1),
    ('Cry',1 );

insert into notes
  (title, content, user_id)
  values
    ('I died', 'Today I ran a mile and almost died', 1),
    ('School', 'School was cool 2day', 1),
    ('Dogs', 'I saw some dogs today', 1)

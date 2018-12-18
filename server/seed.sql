insert into users
  (name, email, username, password, twitter_id)
  values
    ('Lorenzo', 'lorenzo@mail.com', 'zo', 'lorenzo', ''),
    ('enzo','zo@mail.com', 'lore', '$2b$10$tIslEYe60Ly.TXu6IhhclO/XL.vIG8ZGg7jvqOJUxF.lC8bmntGBi', '');

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
    ('Dogs', 'I saw some dogs today', 1);

insert into preferences
  (name)
  values 
    ('Todos'),
    ('Notepad'),
    ('Weather'),
    ('News');

insert into user_preferences
  (user_id, pref_id)
  values  
    (1, 1),
    (1, 2),
    (1,4),
    (2, 3),
    (2, 2),
    (2,1);
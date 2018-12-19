create table users(
  id serial primary key,
  name varchar(50) not null,
  email varchar(50) not null unique,
  username varchar(50) not null unique,
  password varchar(100) not null,
  github_id varchar(100) 
);

create table todos(
  id serial primary key,
  content text,
  user_id integer references users(id)
);

create table notes(
  id serial primary key,
  title text,
  content text,
  user_id integer references users(id)
);

create table preferences(
  id serial primary key,
  name text
);

create table user_preferences(
  id serial primary key,
  index integer,
  user_id integer references users(id),
  pref_id integer references preferences(id)
)


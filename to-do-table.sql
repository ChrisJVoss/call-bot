DROP TABLE IF EXISTS todo;

CREATE TABLE todo (
  phone   text,
  id      serial,
  task    text,
  time    text,
  buffer  text
  );

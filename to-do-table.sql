DROP TABLE IF EXISTS todo;

CREATE TABLE todo (
  phone      text,
  id         serial,
  task       text,
  date       date,
  date_text  text,
  time       time,
  time_text  text
  );

create database praktika_postgres;
-- \connect praktika_postgres
create TABLE tests(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    describe VARCHAR(255)
);
create TABLE results(
    id SERIAL PRIMARY KEY,
    complete_time timestamp,
    correct_count INTEGER,
    user_id INTEGER,
    test_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (test_id) REFERENCES tests (id)
);
create TABLE questions(
    id SERIAL PRIMARY KEY,
    test_id INTEGER,
    title VARCHAR(255),
    describe VARCHAR(255),
    first_answer VARCHAR(255),
    second_answer VARCHAR(255),
    third_answer VARCHAR(255),
    fourth_answer VARCHAR(255),
    correct_answer VARCHAR(255),
    FOREIGN KEY (test_id) REFERENCES tests (id)
);
create TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255),
    first_name VARCHAR(255),
    second_name VARCHAR(255),
    third_name VARCHAR(255),
    division_id INTEGER,
    FOREIGN KEY (division_id) REFERENCES divisions (id)
);
create TABLE divisions(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255)
);
create TABLE test_for_division(
    id SERIAL PRIMARY KEY,
    test_id INTEGER,
    division_id INTEGER,
    FOREIGN KEY (test_id) REFERENCES tests (id),
    FOREIGN KEY (division_id) REFERENCES divisions (id)
);
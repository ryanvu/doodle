-- Create Database CREATE DATABASE database_name;

CREATE DATABASE doodlegram;

CREATE TABLE users (
    id BIGINT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE doodles (
    id BIGINT,
    caption VARCHAR(140),
    date_created TIMESTAMP NOT NULL,
    user_id BIGINT REFERENCES users(id),
    likes INT,
    PRIMARY KEY(id)
);

CREATE TABLE follows (
    follower_id BIGINT REFERENCES users(id),
    followee_id BIGINT REFERENCES users(id)
);

CREATE TABLE comments (
    comment_id BIGINT,
    doodle_id BIGINT REFERENCES doodles(id),
    date_created TIMESTAMP NOT NULL,
    user_id BIGINT REFERENCES users(id),
    PRIMARY KEY(comment_id)
);
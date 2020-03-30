 \c chatboot

CREATE TABLE public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    username character(20) COLLATE pg_catalog."default" NOT NULL,
    password character(60) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT uniq_login UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

INSERT INTO users (username, password) VALUES('user1', '$2a$10$yulJAkWKJpcioJfuiTB8K.DZED3lHHIwW8L3DtfS01.N9D/M1CBju');
INSERT INTO users (username, password) VALUES('user2', '$2a$10$2PpUCZGYnrm7/LKmsCRS5epKlvTGqHlgS432i7vvguBL4Y8FPHqx6');

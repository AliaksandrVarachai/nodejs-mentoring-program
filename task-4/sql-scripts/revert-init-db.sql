-- psql -U postgres -f revert-init-db.sql -v userName=task4_user -v dbName=task4_db

DROP DATABASE :dbName;
DROP USER :userName;
DROP ROLE task4_readwrite;

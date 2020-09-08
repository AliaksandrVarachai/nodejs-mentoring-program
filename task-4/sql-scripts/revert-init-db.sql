-- psql -U postgres -f revert-init-db.sql -v userName=task3_user -v -dbName=task3_db

DROP DATABASE :dbName;
DROP USER :userName;
DROP ROLE task3_readwrite;

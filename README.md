# Task Manager Web App

This is a simple web app for managing tasks. It provides functionalities to add tasks, paginate through tasks, and query tasks by name.

## Getting Started

### Prerequisites & install

- Docker
- Docker Compose
- Node.js
- PostgreSQL


## clone the repository:

```bash
git clone https://github.com/mtu-workshop-2024.git

```

# MTUxKU: Employee API

## Lesson2-scaling

### First, Run the project
```bash
$ npm run start-dev
```

### Seeding mock date
```bash
$ node generateMockData.js
```
* Can change number to seeding data into database in "const employeeCount = 1;"

### SQL Example
```
SELECT COUNT(id) FROM employees WHERE join_date = '2019-03-23';
SELECT COUNT(id) FROM employees_indexed WHERE join_date = '2019-03-23';

SELECT COUNT(id) FROM employees WHERE department LIKE '%pov%';
SELECT COUNT(id) FROM employees_indexed WHERE department LIKE '%pov%';

SELECT id, name, phone_number, join_date FROM employees WHERE name = 'Aaron Myers' AND phone_number = '(711) 968-3455' AND join_date = '2019-06-24' LIMIT 100 OFFSET 0;
```

## Lesson2-scaling

### Prerequisites & install

edit hostfile
```bash
$ vim /etc/hosts
```

add hostnamefile
```
127.0.0.1       whoami.local
```

run command
```bash
$ docker-compose up -d
```

curl for check host
```bash
curl whoami.local
```

scale up server
```bash
$ docker-compose up -d --scale whoami=3
```
curl for check host
```bash
curl whoami.local
```







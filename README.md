# MTUxKU: Employee API

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

## Lesson1-Database-index

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

## Lesson2-Scaling

### Prerequisites & install

edit hostfile

```bash
$ vim /etc/hosts
```

edit hostname file and add hostname to the file

```
127.0.0.1       employees.local
```

command
```bash
$ docker-compose up -d --build
```

check host
```bash
curl employees.local
```

scale up server
```bash
$ docker-compose up -d --build --scale webapp=3
```
check host
```bash
curl employees.local
```






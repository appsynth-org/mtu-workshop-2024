# MTUxKU: Employee API

## Getting Started

### Prerequisites & install 
- docker,docker-compose
- vscode

```goto lesson0```

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

### Prerequisites 

- Edit hostfile for set the name server

```bash
$ vim /etc/hosts
```

- edit hostname file and add hostname to the file

```bash
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	    localhost
255.255.255.255	broadcasthost
::1             localhost
```
- add the host name to this file
```
127.0.0.1       employees.local
```

```bash
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	    localhost
255.255.255.255	broadcasthost
::1             localhost
127.0.0.1       employees.local
```

```to verify by ping employees.local```
```bash
$ ping employees.local
```
### Start service from lesson1

```bash
$ cd lesson2
$ docker-compose up -d --build
```
- check status services or logs
```bash
$ docker-compose ps
```

ex.
```
NAME                    IMAGE                    COMMAND                  SERVICE       CREATED        STATUS        PORTS
lesson2-nginx-proxy-1   nginxproxy/nginx-proxy   "/app/docker-entrypo…"   nginx-proxy   27 hours ago   Up 27 hours   0.0.0.0:80->80/tcp
lesson2-postgresdb-1    postgres:latest          "docker-entrypoint.s…"   postgresdb    27 hours ago   Up 27 hours   0.0.0.0:5432->5432/tcp
lesson2-redis-1         redis:latest             "docker-entrypoint.s…"   redis         27 hours ago   Up 27 hours   0.0.0.0:65374->6379/tcp
lesson2-webapp-1        lesson2-webapp           "docker-entrypoint.s…"   webapp        27 hours ago   Up 27 hours   0.0.0.0:65375->3000/tcp
pgadmin4_container      dpage/pgadmin4           "/entrypoint.sh"         pgadmin       27 hours ago   Up 27 hours   443/tcp, 0.0.0.0:8888->80/tcp
```


Note: if it's fail or cannot start service you can use this command for check the logs
```bash
$ docker-compose logs -f --tail 100
```

- Next, open web brower to check the status service
```
http://employess.local
```

- Or, curl command
```bash
$ curl http://employess.local
```
```should see the status 200 ok and hostname that is container id```

ex.
```
{"status":"OK","hostname":"3d99b5c8fc27"}
```

#### For Test scale up services and verify
- scale service up to 3
```bash
$ docker-compose up -d --build --scale webapp=3
```
- Next, open web brower to check the status service
```
http://employess.local
```

- Or, curl command
```bash
$ while true; do sleep 1; curl employees.local ;echo; done
```

```should see the status 200 ok and hostname that is container id randomly```
ex.
```
{"status":"OK","hostname":"3d99b5c8fc27"}
{"status":"OK","hostname":"bd6189f94392"}
{"status":"OK","hostname":"a3fbce0a6f7d"}
```







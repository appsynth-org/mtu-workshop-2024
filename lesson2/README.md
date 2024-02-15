## Lesson 2 - Server Scaling

### Prerequisites 

Edit the Hosts File:

Open the hosts file for editing.

```bash
$ vim /etc/hosts
```

- Add the hostname employees.local to the file:

```bash
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	    localhost
255.255.255.255	broadcasthost
::1             localhost
```
- Your file should now include the following entries:
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

Verify the Hostname:

Test the new hostname using ping:

```bash
$ ping employees.local
```
### Starting the Service from Lesson 1

To start the service from the previous lesson:

```bash
$ cd lesson2
$ docker-compose up -d --build
```
- Check Service Status or Logs:
- To view the status of the services or check logs, use:
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

If you encounter issues starting the service, you can check the logs with:

```bash
$ docker-compose logs -f --tail 100
```

- Accessing the Service:

Open a web browser and navigate to http://employees.local.
Alternatively, use the curl command:
```bash
$ curl http://employess.local
```
You should see a response like:

``{"status":"OK","hostname":"[container id]"}.``


#### Testing Service Scaling 
To scale up the services and verify their performance:
- Scale Up the Service:
Increase the webapp service instances to 3:
```bash
$ docker-compose up -d --build --scale webapp=3
```
Verify the Scaling:

- Revisit http://employees.local in your web browser.
Or, continuously check the service using curl:
```bash
$ while true; do sleep 1; curl employees.local; echo; done
```

- should see the status 200 ok and hostname that is container id randomly

```
{"status":"OK","hostname":"[container id 1]"}
{"status":"OK","hostname":"[container id 2]"}
{"status":"OK","hostname":"[container id 3]"}
```

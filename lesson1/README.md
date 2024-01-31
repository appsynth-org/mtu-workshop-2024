## Lesson 1 - Indexing and Caching

This is a simple project to learn about indexing and caching. You will see how it works and how we can configure the basics of any API service.

PS. This project was created by ChatGPT.

## Prerequisites & Installation
- Programs that we have already installed in **lesson0**
- Github Account

## Clone the init project from Github
```bash
git clone https://github.com/appsynth-org/mtu-workshop-2024.git
cd lesson1
docker-compose up -d --build
```
What are the flags?
- ```-d, --detach``` Detached mode: Run containers in the background
- ```--build``` Build images before starting containers

If everything is done, it should respond like:
```bash
[+] Building 7.4s (11/11) FINISHED                                                                                                                                       docker:desktop-linux
 => [webapp internal] load build definition from dockerfile                                                                                                                              0.0s
 => => transferring dockerfile: 168B                                                                                                                                                     0.0s
 => [webapp internal] load .dockerignore                                                                                                                                                 0.0s
 => => transferring context: 2B                                                                                                                                                          0.0s
 => [webapp internal] load metadata for docker.io/library/node:latest                                                                                                                    3.3s
 => [webapp 1/6] FROM docker.io/library/node:latest@sha256:0ded28778059262bd3c066b609186e5b6c89550a9362dce4309ad67c95af0d77                                                              0.0s
 => [webapp internal] load build context                                                                                                                                                 0.0s
 => => transferring context: 57.01kB                                                                                                                                                     0.0s
 => CACHED [webapp 2/6] WORKDIR /usr/app                                                                                                                                                 0.0s
 => [webapp 3/6] COPY package*.json ./                                                                                                                                                   0.0s
 => [webapp 4/6] COPY *.js ./                                                                                                                                                            0.0s
 => [webapp 5/6] COPY src /usr/app/src                                                                                                                                                   0.0s
 => [webapp 6/6] RUN npm install                                                                                                                                                         3.9s
 => [webapp] exporting to image                                                                                                                                                          0.1s
 => => exporting layers                                                                                                                                                                  0.1s
 => => writing image sha256:a24c9ca9106267aa50a2bc90a4de2d3ffcc446a3027d7710e16ab5fc149acbf7                                                                                             0.0s
 => => naming to docker.io/library/lesson1-webapp                                                                                                                                        0.0s
[+] Running 5/5
 ✔ Network lesson1_default         Created                                                                                                                                               0.0s 
 ✔ Container lesson1-redis-1       Started                                                                                                                                               0.0s 
 ✔ Container lesson1-postgresdb-1  Started                                                                                                                                               0.0s 
 ✔ Container lesson1-webapp-1      Started                                                                                                                                               0.0s 
 ✔ Container pgadmin4_container    Started
```

## Before we go the next step

First, we need to check if our API is listening. Try making a request in the Terminal:
```Bash
curl http://localhost:3000
```
You should retrieve a response like:
```JSON
{"status":"OK","hostname":"0816da6a026f"}
```
Alternatively, you can open a browser and navigate to http://localhost:3000/. It should respond with HTTP 200 and display a JSON object similar to the response above.

## Time to seed a data into database
We have a script to create migration and seed simple data into the database. Firstly, you have to access the Docker container with this command:
```bash
docker exec -it lesson1-webapp-1 /bin/bash
node generateMockData.js 100
```
You should retrieve a response like:
```bash
Initialized database schema
100 mock employees inserted successfully.
generateMockEmployee: 13.18ms
```
Hurrah! If you see the same response as above, that means you have already seeded data into the database and are ready to access it via the REST API.

## Available APIs
We have created basic APIs to support CRUD operations for handling employees in a company.

- `[GET] /api/employees` Gets all employees
  - `[query] page` Handles the page of data.
  - `[query] pageSize` Handles the size of data in a page.
  - `[query] (...columnInTable)` Filtering by containing specific data (Refer to all fields in `employees`, `/src/dbInit.js`)
- `[GET] /api/employees/:id` Get a employee by ID

## Performing simple performance testing with cURL
So, we will use a random ID to retrieve an employee data with this script:
```bash
curl http://localhost:3000/api/employees/5454
```

You should retrieve data similar like this:
```JSON
{"id":5454,"name":"Dylan Snyder","position":"Network Operator","department":"ceuv","phone_number":"(300) 391-4338","employee_type":"Freelance","join_date":"2019-05-22T00:00:00.000Z","is_resigned":false}%
```

And then, we will only use the API to get the list of employees, filtering some database on fields in the table (`employees`, `/src/dbInit.js`).
```bash
curl -o /dev/null -s -w 'Total: %{time_total}s\n' --location 'http://localhost:3000/api/employees?position=Network%Operator'
```
You should retrieve total request times:
```bash
Total: 0.069270s
```

Okay, we can retrieve users from the database, but it seems to be very fast, right? Then, try adding more mock data, perhaps **100,000** rows and up to **1,000,000** or even more than **10,000,000** records, and try to recall it again.
```bash
node generateMockData.js 100000
```
<span style="color:red">
  * Be careful when running the script to generate mock data. If it's too much in once, your machine might not be able to handle it!
</span>

## Let's improve the database performance by indexing
We have included **pgAdmin** in the docker-compose. You just have to open a browser and navigate to http://localhost:8888/.
- Login by
  - Username: `admin@admin.com`
  - Password: `adminpassword`

After we logged-in, we have to adding a new server, please follow steps below.

### Adding new server on pgAdmin:
1. Locking and click `Add New Server` on Quick Links section. (Or click the Servers on left-hand side, then, click menu `Object` > `Register` > `Server...`)
2. A dialog named `Register - Server` should show up
3. In General tab, We need to enter server name, we will use `Docker PG`
4. Navigate to Connection tab
5. Enter data follow as
   - Host name/address: `postgresdb`
   - Port: `5432` (default)
   - Maintenance database: `employees`
   - Username: `postgres`
   - Kerberos authentication: `false` (default)
   - Password: `123456`
   - Save password?: `true` 
6. Click `Save`
7. On the left-hand side, you will see the `Docker PG` appearing. Then, click to collapse `Docker PG` > `Databases` > `employees` > `Schemas (1)` > `Public` > `Table (1)`, and you will see the `employees` table there.
8. Right click over the `employees` table, select `View/Edit Data` > `First 100 Rows`

At this point, you can now view the data in the database and freely use SQL commands.

### Creating a new Index:
We used to filter by `position` in the 'get all employees' API, so, now, we will try indexing a single field first
1. Collapse the `employees` table.
2. Right-click over `Indexes`.
3. Select `Create` > `Index....`
4. A dialog will show up.
5. In the General tab, enter the index name. We will use `index_position`.
6. Navigate to the Columns tab, turn off `Is expression`.
7. Select `position` in the Column, click `Add`, and you will see a new row in the table below.
8. Click `Save`, and the new index named `index_position` will appear below the `Indexes (1)` section.

We will now try to request data by applying filters again.
```bash
curl -o /dev/null -s -w 'Total: %{time_total}s\n' --location 'http://localhost:3000/api/employees?position=Network%Operator'
```
You should retrieve total request times:
```bash
Total: 0.028953s
```
Do you notice any difference in speed? Initially, before we indexed the data, the waiting time for data to be returned was much longer. After indexing, it significantly decreased from `0.069270s` to just `0.028953s` immediately, and if we want to search from other fields, we can also create an index for those fields as well.

### In this workshop we will do only two type of index:
1. `Single-Column Index`: Indexing based on a single column.
2. `Compound Index` or also known as a `Composite Index`: Indexing based on multiple columns.

The order of columns in a compound index can have an impact on query performance, and it's essential to consider the types of queries you intend to run.

1. **Columns A and B:**
   - This means that the index is ordered first by column A and then by column B.
   - It is most effective for queries that filter on both columns A and B.
   - May be less effective for queries that only filter on column B.
2. **Columns B and A:**
   - This means that the index is ordered first by column B and then by column A.
   - It is most effective for queries that filter on both columns B and A.
   - May be less effective for queries that only filter on column A.

In summary, the order of columns in a compound index matters, and you should choose the order based on the types of queries you expect to run. If you often filter on both columns A and B, then an index on (A, B) might be more beneficial. If you frequently filter on B alone, then (B, A) might be more appropriate. It's often a trade-off and depends on the specific patterns of data access in your application.

### There are several types of indexing, and some common ones include:
1. `Single-Column Index`: Indexing based on a single column.
2. `Compound Index` or also known as a `Composite Index`: Indexing based on multiple columns.
3. `Unique Index`: Ensures that the indexed column (or combination of columns) contains unique values, preventing duplicate entries.
4. `Clustered Index`: Determines the order in which data is physically stored in a table. A table can have only one clustered index.
5. `Non-Clustered Index`: Creates a separate structure to store the index, leaving the original data table unchanged.
6. `Bitmap Index`: Uses a bitmap for each possible value in the indexed column, allowing for efficient querying on multiple columns.
7. `Spatial Index`: Specifically designed for spatial data types, optimizing spatial queries.
8. `Full-Text Index`: Used for searching character-based data using full-text queries.

The choice of indexing type depends on the specific requirements and characteristics of the data and the queries used in a particular database system.

---

## And, What about the caching?
We have also implemented caching using `Redis` in this project. You can try it by changing the request URL from `/api/employees` to `/api/cached/employees` like this:
```bash
curl -o /dev/null -s -w 'Total: %{time_total}s\n' --location 'http://localhost:3000/api/cached/employees?position=Network%Operator'
```
You should retrieve total request times:
```bash
Total: 0.028953s
```

*Ah, why is the latest request the same? No, it's not the same at all. Just try making the request again with the same URL and wait to see the result time.*

You should retrieve total request times:
```bash
Total: 0.005581s
```

The total request time has reduced from `0.028953s` to `0.005581s.`
Do you see how much faster it is compared to when caching was not implemented?

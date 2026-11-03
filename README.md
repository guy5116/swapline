Basic Startup:

>Make the mySQL Database
```
CREATE DATABASE swapline;
```

>Create .env file
```
PORT=YOUR PORT
SESSION_SERCRET=ENTER YOUR SECRET
```

>shell
```
npm install express express-session ejs bcryptjs dotenv mysql2   
npm run dev
```

>Node Package requirements
```
express				dotenv
express-sessions		ejs
bcrypt				mysql2
```



Swap Line is a scheduling platform with the goals of
	1. Allowing **Employees** to access their schedule (Logic Done)
	2. Allowing **Employees** to inact a swap with a fellow employee (Not Started)
	3. Allowing **Managers** to access all employees schedules (Logic Done)
	4. Allowing **Managers** to add, delete, and update schedules (Working On)
	5. Allowing **Managers** to approve a swap between two employees (Not Started)

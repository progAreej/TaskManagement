
// // // // require('dotenv').config();
// // // // const express = require('express');
// // // // const bodyParser = require('body-parser');
// // // // const cors = require('cors');
// // // // const userRoutes = require('./Routes/userRouters'); // Ensure this path is correct
// // // // const auth = require('./middlewares/auth');

// // // // const app = express();

// // // // app.use(cors());
// // // // app.use(bodyParser.json());
// // // // app.use('/api/users', userRoutes);

// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // // // require('dotenv').config();
// // // // const express = require('express');
// // // // const bodyParser = require('body-parser');
// // // // const taskRoutes = require('./Routes/taskRoutes');
// // // // const cors = require('cors');

// // // // const app = express();

// // // // app.use(cors());
// // // // app.use(bodyParser.json());
// // // // app.use('/api', taskRoutes);

// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // // require('dotenv').config();
// // // const express = require('express');
// // // const bodyParser = require('body-parser');
// // // const cors = require('cors');
// // // const userRoutes = require('./Routes/userRouters'); // Ensure this path is correct
// // // const taskRoutes = require('./Routes/taskRouter'); // Ensure this path is correct

// // // const app = express();

// // // app.use(cors());
// // // app.use(bodyParser.json());
// // // app.use('/api/users', userRoutes);
// // // app.use('/api/tasks', taskRoutes);

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // require('dotenv').config();
// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const userRoutes = require('./Routes/userRouters'); // Ensure this path is correct
// // const taskRoutes = require('./Routes/taskRouter'); // Ensure this path is correct

// // const app = express();

// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use('/api/users', userRoutes);
// // app.use('/api/tasks', taskRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const userRoutes = require('./Routes/userRouters'); // Adjust the path if needed
// const taskRoutes = require('./Routes/taskRouter'); // Adjust the path if needed

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/api/users', userRoutes);
// app.use('/api/tasks', taskRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./Routes/userRouters'); // Adjust path if needed
const taskRoutes = require('./Routes/taskRouter'); // Adjust path if needed

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

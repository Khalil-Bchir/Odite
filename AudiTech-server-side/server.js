//server
const express = require("express");
const mongoose = require('mongoose');

const UserRoutes = require ('./App/Routers/UserRoutes');
const CompanySheetRoutes = require ('./App/Routers/CompanySheetRoutes');
const LogRoutes = require ('./App/Routers/LogRoutes');
const SectionRoutes = require ('./App/Routers/SectionRoutes');
const QuestionRoutes = require ('./App/Routers/QuestionRoutes');
const HeadingRoutes = require ('./App/Routers/HeadingRoutes');
const AuditSheetRoutes = require ('./App/Routers/AuditeSheetRoutes');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', UserRoutes);
app.use('/api/', CompanySheetRoutes);
app.use('/api', LogRoutes);
app.use('/api/', SectionRoutes);
app.use('/api', QuestionRoutes);
app.use('/api/', HeadingRoutes);
app.use('/api', AuditSheetRoutes);

// Welcome Page for /api/
app.get('/api/', (req, res) => {
    res.send('Welcome to the /api/ route!');
});

mongoose.connect('mongodb+srv://prestigeproformation:prestigeproformation@cluster0.guzmh23.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Running on port 3000!');
    });
}).catch((err) => {
    console.log(err);
});
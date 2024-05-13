const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()); // Middleware to parse JSON bodies

// Import your function (make sure it is correctly exported from your model file)
const { getProfessorCodeBySubject } = require('./path/to/your/module');

// Endpoint to get professor code by subject
app.get('/api/professor-code/:subject', async (req, res) => {
    const { subject } = req.params;
    try {
        const profCode = await getProfessorCodeBySubject(subject);
        if (!profCode) {
            return res.status(404).send('No professor found for the given subject');
        }
        res.json({ professorCode: profCode });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

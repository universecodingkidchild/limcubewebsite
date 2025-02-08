const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Set up EJS and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/tutoring', (req, res) => {
    res.render('tutoring');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Handle POST request from the contact form
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use Gmail as the email service
        auth: {
            user: 'limcubes@gmail.com', // Replace with your Gmail address
            pass: 'hcrs bwip wzib gzhj', // Replace with your Gmail password or app-specific password
        },
    });

    // Email options
    const mailOptions = {
        from: email, // Sender's email address
        to: 'limcubes@gmail.com', // Recipient's email address
        subject: `New Message from ${name}`, // Email subject
        text: message, // Email body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.send('Error: Unable to send email.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Thank you! Your message has been sent.');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
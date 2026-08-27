const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
});

app.post('/companies', async (req, res) => {
    const {name, industry, website} = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO companies (name, industry, website) VALUES ($1, $2, $3) RETURNING *',
            [name, industry, website]
        );
        res.json(result.rows[0]);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Eroare la crearea companiei'});
    }
});

app.post('/applications', async (req, res) => {
    const {company_id, role, status, date_applied} = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO applications (company_id, role, status, date_applied) VALUES ($1, $2, $3, $4) RETURNING *',
            [company_id, role, status, date_applied]
        );
        res.json(result.rows[0]);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Eroare la crearea aplicatiei'});
    }
});

app.patch('/applications/:id', async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    try {
        const result = await pool.query(
            'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        res.json(result.rows[0]);
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Eroare la updatarea statusului'});
    }
});

app.post('/interviews', async (req, res) => {
    const {application_id, round, notes, date} = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO interviews (application_id, round, notes, date) VALUES ($1, $2, $3, $4) RETURNING *',
            [application_id, round, notes, date]
        );
        res.json(result.rows[0]); 
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Eroare la crearea interviewurilor'});
    }
});

app.get('/applications', async (req, res) => {
    try{
        const result = await pool.query(
            'SELECT applications.role, applications.status, applications.date_applied, companies.name FROM applications JOIN companies ON applications.company_id = companies.id',
        );
        res.json(result.rows);
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Eroare la afisarea aplicatiilor la companii'});
    }
});

app.get('/applications/status', async (req, res) => {
    const {status} = req.query;
    try{
        const result = await pool.query(
            'SELECT applications.role, applications.status, companies.name FROM applications JOIN companies ON applications.company_id = companies.id WHERE status = $1',
            [status]
        );
        res.json(result.rows)
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Eroare la alegerea statusului'});
    }
});

app.get('/interviews/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const result = await pool.query(
            'SELECT interviews.round, applications.role, companies.name FROM interviews JOIN applications ON interviews.application_id = applications.id JOIN companies ON applications.company_id = companies.id WHERE interviews.application_id = $1',
            [id]
        );
        res.json(result.rows)
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Eroare la gruparea interviewurilor'});
    }
});

app.get('/applications/status/group', async (req, res) => {
    try{
        const result = await pool.query(
            'SELECT applications.status, COUNT(*) FROM applications GROUP BY applications.status',
        );
        res.json(result.rows)
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Eroare la gruparea aplicatiilor'});
    }
});

app.delete('/applications/delete/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const result = await pool.query(
            'DELETE FROM applications WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows)
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Nu s-a putut sterge'});
    }
});

module.exports = app;
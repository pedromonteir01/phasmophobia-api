const pool = require('../database/database.config');

const getAllEvidences = async(req, res) => {
    try {
        const evidences = await pool.query('SELECT * FROM evidences');
        return evidences.rowCount > 0 ? 
            res.status(200).send(evidences.rows) :
            res.status(200).send({ message: 'no evidences registered' });
    } catch(e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could GET http' });
    }
}

const getEvidenceByName = async(req, res) => {
    try {
        const { name } = req.params;
        
        let verifyName = name.split('-') ;

        const evidences = await pool.query('SELECT * FROM evidences WHERE name LIKE $1',
            [`${verifyName.join(' ')}%`]
        );
        return evidences.rowCount > 0 ? 
            res.status(200).send(evidences.rows) :
            res.status(200).send({ message: 'no evidences registered' });
    } catch(e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could GET http' });
    }
}

const postEvidence = async(req, res) => {
    try {
        const { name, description } = req.body;

        if(!name || !description) {
            return res.status(400).send({ message: 'incomplete data' });
        } else if(name.length < 4) {
            return res.status(400).send({ message: 'short name' });
        } else if(description.length < 10) {
            return res.status(400).send({ message: 'short description' });
        } else {

            const dbEvidences = (await pool.query('SELECT * FROM evidences;')).rows;
            const nameEvidences = dbEvidences.map(index => index.name);
            if(name.includes(nameEvidences)) {
                return res.status(400).send({ message: 'This evidence already exists' });
            } else {
                await pool.query('INSERT INTO evidences(name, description) VALUES ($1, $2)',
                [name, description]);
            }
        }

    } catch(e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could POST http' });
    }
}

module.exports = { getAllEvidences, getEvidenceByName, postEvidence };
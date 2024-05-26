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

module.exports = { getAllEvidences };
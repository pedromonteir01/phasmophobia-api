const pool = require('../database/database.config');

const getAllTypes = async(req, res) => {
    try {
        const types = await pool.query('SELECT name AS type FROM ghosts_types INNER JOIN ghosts_evidences ON ghost = ghosts_types.name GROUP BY type;');
    } catch(e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could GET http' });
    }
}
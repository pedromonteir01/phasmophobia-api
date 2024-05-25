const pool = require('../database/database.config');

const getAllTypes = async(req, res) => {
    try {
        const types = await pool.query(`
        SELECT ghosts_types.name AS type, STRING_AGG(ghosts_evidences.evidence, ', ') AS evidences
        FROM ghosts_types
        INNER JOIN ghosts_evidences ON ghosts_types.name = ghosts_evidences.ghost
        GROUP BY ghosts_types.name;
        `);

        return types.rowCount > 0 ?
            res.status(200).send({ total: types.rowCount, ghosts: types.rows }) :
            res.status(200).send({ message: 'No type of ghost was registered' });
            
    } catch(e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could GET http' });
    }
}

const getTypeByName = async(req, res) => {
    try {
        const { name } = req.params;

        const type = await pool.query(`SELECT ghosts_types.name AS type, STRING_AGG(ghosts_evidences.evidence, ', ') AS evidences
        FROM ghosts_types
        INNER JOIN ghosts_evidences ON ghosts_types.name = ghosts_evidences.ghost
        WHERE ghosts_types.name LIKE $1
        GROUP BY ghosts_types.name;`, [`${name}%`]);

        return type.rowCount > 0 ? 
            res.status(200).send( type.rows[0] ):
            res.status(200).send({ message: 'Type not found' });
    } catch(e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could GET http' });
    }
}

const postType = async(req, res) => {
    try {
        const { name, description, evidences } = req.body;
        
        if(!name || !description || !evidences) {
            return res.status(400).send({ message: 'incomplete data' });
        } else if(name.length < 3) {
            return res.status(400).send({ message: 'short name' });
        } else if(description.length < 15) {
            return res.status(400).send({ message: 'short description' });
        }
    } catch(e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could POST http' });
    }
}

module.exports = { getAllTypes, getTypeByName, postType };
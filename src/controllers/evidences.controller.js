const pool = require('../database/database.config');

const getAllEvidences = async(req, res) => {
    try {
        const evidences = await pool.query('SELECT * FROM evidences WHERE name != $1;',
            ['suportPut']);
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
        
        let verifyName = name.split('-');

        if(verifyName == 'suportPut') {
            verifyName = ['emf5'];
        }

        const evidences = await pool.query('SELECT * FROM evidences WHERE name LIKE $1;',
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
                await pool.query('INSERT INTO evidences(name, description) VALUES ($1, $2);',
                [name, description]);
            }
        }

    } catch(e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could POST http' });
    }
}

const putEvidence = async(req, res) => {
    try {
        const { name } = req.params;
        const { newName, description } = req.body;

        const dbEvidences = (await pool.query('SELECT * FROM evidences WHERE name=$1;',[name])).rows;
        if(!dbEvidences) {
            return res.status(200).send({ message: 'this evidence does not exist' });
        } else {
            const getAllEvidences = (await pool.query('SELECT name FROM evidences WHERE name != $1;',['suportPut'])).rows;
            const arrayNames = getAllEvidences.map(index => index.name);
            if(newName.includes(arrayNames)) {
                return res.status(400).send({ message: 'evidence with this name already exists' });
            }  
            const ghost = (await pool.query(`
            SELECT DISTINCT ghosts_types.name AS type
            FROM ghosts_types
            INNER JOIN ghosts_evidences ON ghosts_types.name = ghosts_evidences.ghost
            WHERE ghosts_evidences.evidence = $1;
            `,[name])).rows;

            if(ghost.length) {
                const ghostsNames = ghost.map(index => index.type);
                for(let i = 0; i <= ghostsNames.length; i++) {
                    await pool.query('UPDATE ghosts_evidences SET evidence=$1 WHERE ghost=$2 AND evidence=$3;',
                        ['suportPut', ghostsNames[i], name]);
                }

                await pool.query('UPDATE evidences SET name=$1, description=$2 WHERE name=$3;',
                [newName, description, name]);

                for(let i = 0; i <= ghostsNames.length; i++) {
                    await pool.query('UPDATE ghosts_evidences SET evidence=$1 WHERE ghost=$2 AND evidence=$3;',
                        [newName, ghostsNames[i], 'suportPut']);
                }

                return res.status(200).send({ message: 'evidence updated' });
            } else {
                await pool.query('UPDATE evidences SET name=$1, description=$2 WHERE name=$3;',
                [newName, description, name]);

                return res.status(200).send({ message: 'evidence updated' });
            }
        }

    } catch(e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could PUT http' });
    }
}

const deleteEvidence = async(req, res) => {
    try {
        const { name } = req.params;

        const dbEvidences = (await pool.query('SELECT * FROM evidences WHERE name=$1;',[name])).rows;
        if(!dbEvidences) {
            return res.status(200).send({ message: 'this evidence does not exist' });
        } else {
            const ghost = (await pool.query(`
            SELECT DISTINCT ghosts_types.name AS type
            FROM ghosts_types
            INNER JOIN ghosts_evidences ON ghosts_types.name = ghosts_evidences.ghost
            WHERE ghosts_evidences.evidence = $1;
            `,[name])).rows;

            if(ghost.length) {
                return res.status(400).send({ message: 'It is not possible to delete evidence, there are ghosts that use it' });
            } else {
                await pool.query('DELETE FROM evidences WHERE name=$1;',[name]);
                return res.status(200).send({ message: 'evidence deleted' });
            }
        }
    } catch(e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could DELETE http' });
    }
}

module.exports = { getAllEvidences, getEvidenceByName, postEvidence, putEvidence, deleteEvidence };
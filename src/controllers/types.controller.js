const pool = require('../database/database.config');
const { sameEvidence, evidencesExists } = require('../models/verify.functions');

const getAllTypes = async (req, res) => {
    try {
        const types = await pool.query(`
        SELECT ghosts_types.name AS type, ghosts_types.description, STRING_AGG(ghosts_evidences.evidence, ', ') AS evidences
        FROM ghosts_types
        INNER JOIN ghosts_evidences ON ghosts_types.name = ghosts_evidences.ghost
        GROUP BY ghosts_types.name;
        `);

        return types.rowCount > 0 ?
            res.status(200).send({ total: types.rowCount, ghosts: types.rows }) :
            res.status(200).send({ message: 'No type of ghost was registered' });

    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could GET http' });
    }
}

const getTypeByName = async (req, res) => {
    try {
        const { name } = req.params;

        const type = await pool.query(`SELECT ghosts_types.name AS type, STRING_AGG(ghosts_evidences.evidence, ', ') AS evidences
        FROM ghosts_types
        INNER JOIN ghosts_evidences ON ghosts_types.name = ghosts_evidences.ghost
        WHERE ghosts_types.name LIKE $1
        GROUP BY ghosts_types.name;`, [`${name}%`]);

        return type.rowCount > 0 ?
            res.status(200).send(type.rows[0]) :
            res.status(200).send({ message: 'Type not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could GET http' });
    }
}

const postType = async (req, res) => {
    try {
        const { name, description, evidences } = req.body;

        if (!name || !description || !evidences) {
            return res.status(400).send({ message: 'incomplete data' });
        } else if (name.length < 3) {
            return res.status(400).send({ message: 'short name' });
        } else if (description.length < 15) {
            return res.status(400).send({ message: 'short description' });
        } else if (sameEvidence(evidences)) {
            return res.status(400).send({ message: 'the three pieces of evidence have to be different' });
        } else {
            const dbEvidences = (await pool.query('SELECT * FROM evidences;')).rows;
            if (!evidencesExists(dbEvidences, evidences)) {
                return res.status(400).send({ message: 'some evidence does not exist' });
            } else {
                const ghost = (await pool.query(`SELECT ghosts_types.name
                FROM ghosts_types
                INNER JOIN (
                    SELECT ghosts_evidences.ghost
                    FROM ghosts_evidences
                    WHERE ghosts_evidences.evidence IN ($1, $2, $3)
                    GROUP BY ghosts_evidences.ghost
                    HAVING COUNT(DISTINCT ghosts_evidences.evidence) = 3
                ) AS matched_ghosts ON ghosts_types.name = matched_ghosts.ghost;
                `, [evidences[0], evidences[1], evidences[2]])).rows[0];

                if (ghost) {
                    return res.status(400).send({ message: 'a type with this evidence already exists' });
                } else {
                    await pool.query('INSERT INTO ghosts_types(name, description) VALUES ($1, $2)', [name, description]);
                    await pool.query('INSERT INTO ghosts_evidences(ghost, evidence) VALUES ($1, $2)', [name, evidences[0]]);
                    await pool.query('INSERT INTO ghosts_evidences(ghost, evidence) VALUES ($1, $2)', [name, evidences[1]]);
                    await pool.query('INSERT INTO ghosts_evidences(ghost, evidence) VALUES ($1, $2)', [name, evidences[2]]);

                    return res.status(200).send({ message: 'type registered successfully' });
                }
            }
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could POST http' });
    }
}

const putType = async (req, res) => {
    try {
        const { name } = req.params;
        const { newName, description, evidences } = req.body;

        const type = (await pool.query('SELECT * FROM ghosts_types WHERE name = $1', [name])).rows[0];

        if (!type) {
            return res.status(404).send({ message: 'type not found' });
        } else {

            if (!name || !description || !evidences) {
                return res.status(400).send({ message: 'incomplete data' });
            } else if (name.length < 3) {
                return res.status(400).send({ message: 'short name' });
            } else if (description.length < 15) {
                return res.status(400).send({ message: 'short description' });
            } else if (sameEvidence(evidences)) {
                return res.status(400).send({ message: 'the three pieces of evidence have to be different' });
            } else {

                const ghost = (await pool.query(`SELECT ghosts_types.name
                FROM ghosts_types
                INNER JOIN (
                    SELECT ghosts_evidences.ghost
                    FROM ghosts_evidences
                    WHERE ghosts_evidences.evidence IN ($1, $2, $3)
                    GROUP BY ghosts_evidences.ghost
                    HAVING COUNT(DISTINCT ghosts_evidences.evidence) = 3
                ) AS matched_ghosts ON ghosts_types.name = matched_ghosts.ghost;
                `, [evidences[0], evidences[1], evidences[2]])).rows[0];

                if (ghost.name !== name) {
                    return res.status(400).send({ message: 'a type with this evidences already exists' });
                } else {
                    const ids = (await pool.query('SELECT id FROM ghosts_evidences WHERE ghost = $1',[name])).rows;
                    const catchIds = ids.map(item => item.id);

                    await pool.query('UPDATE ghosts_evidences SET ghost=$1, evidence=$2 WHERE id=$3', [newName, evidences[0], catchIds[0]]);
                    await pool.query('UPDATE ghosts_evidences SET ghost=$1, evidence=$2 WHERE id=$3', [newName, evidences[1], catchIds[1]]);
                    await pool.query('UPDATE ghosts_evidences SET ghost=$1, evidence=$2 WHERE id=$3', [newName, evidences[2], catchIds[2]]);

                        
                    return res.status(200).send({ message: 'type updated successfully' });
                }
            }
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could PUT http' });
    }
}

const deleteType = async (req, res) => {
    try {
        const { name } = req.params;

        const type = (await pool.query('SELECT * FROM ghosts_types WHERE name = $1', [name])).rows[0];

        if (!type) {
            return res.status(404).send({ message: 'type not found' });
        } else {
            await pool.query('DELETE FROM ghosts_types WHERE name = $1', [name]);
            await pool.query('DELETE FROM ghosts_evidences WHERE ghost = $1', [name]);

            return res.status(200).send({ message: 'type deleted successfully' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Not could DELETE http' });
    }
}

module.exports = { getAllTypes, getTypeByName, postType, putType, deleteType };
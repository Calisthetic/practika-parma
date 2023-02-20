const db = require('../db');

class ResultController {
    async createResult(req, res) {
        const {correct_count, user_id, test_id} = req.body
        const exist = await db.query(`SELECT * FROM results where user_id = $1 AND test_id = $2`, [user_id, test_id])
        if (exist.rows.length === 0) {
            const current_time = await db.query('SELECT CURRENT_TIMESTAMP')
            const newPerson = await db.query(`INSERT INTO results (complete_time, correct_count, user_id, test_id) 
                values ($1, $2, $3, $4) RETURNING *`, [current_time.rows[0].current_timestamp, correct_count, user_id, test_id])
            res.json(newPerson.rows[0])
        } else {
            res.send("Already exist")
        }
    }
    async getResultsByUserOrTest(req, res) {
        const user_id = req.query.user_id
        const test_id = req.query.test_id
        let results
        if ((test_id === null || test_id === '' || test_id === undefined) && (user_id === null || user_id === '' || user_id === undefined)) {
            results = await db.query(`SELECT * FROM results `)
        } else if (test_id === null || test_id === '' || test_id === undefined) {
            results = await db.query(`SELECT * FROM results where user_id = $1`, [user_id])
        } else if (user_id === null || user_id === '' || user_id === undefined) {
            results = await db.query(`SELECT * FROM results where test_id = $1`, [test_id])
        } else {
            results = await db.query(`SELECT * FROM results where user_id = $1 AND test_id = $2`, [user_id, test_id])
        }
        res.json(results.rows)
    }
    async deleteRusult(req, res) {
        const id = req.params.id
        const del_result = await db.query(`DELETE FROM results where id = $1`, [id])
        res.send("Successfully deleted")
    }
}

module.exports = new ResultController()
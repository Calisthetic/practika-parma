const db = require('../db');

class TestForDivisionController { // TFD
    async createTest(req, res) {
        const {test_id, division_id} = req.body
        const newTFD = await db.query(`INSERT INTO test_for_division (test_id, division_id) values ($1, $2) RETURNING *`, [test_id, division_id])
        res.json(newTFD.rows[0])
    }
    async getTFDs(req, res) {
        const tfds = await db.query(`SELECT * FROM test_for_division`)
        res.json(tfds.rows)
    }
    async deleteTest(req, res) {
        const id = req.params.id
        const del_TFD = await db.query(`DELETE FROM test_for_division where id = $1`, [id])
        res.send("Successfully deleted")
    }
}

module.exports = new TestForDivisionController()
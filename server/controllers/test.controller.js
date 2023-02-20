const db = require('../db');

class TestController {
    async createTest(req, res) {
        const {title, describe} = req.body
        const newTest = await db.query('INSERT INTO tests (title, describe) values ($1, $2) RETURNING *', [title, describe])
        res.json(newTest.rows[0])
    }
    async getTestsByUserId(req, res) {
        try {
            const user_id = req.query.user_id
            const completed = req.query.completed
            if (user_id === undefined) { 
                const users = await db.query('SELECT * FROM tests')
                res.json(users.rows)
            } else if ((completed === 'false')&& user_id !== undefined) {
                const user_division = await db.query('SELECT * FROM users where id = $1', [user_id])
                const test_id = await db.query('SELECT * FROM test_for_division where division_id = $1', [user_division.rows[0].division_id])
                let test_list = []
                for (let i = 0; i < test_id.rows.length; i++) {
                    const test = await db.query('SELECT * FROM tests where id = $1', [test_id.rows[i].test_id])
                    const result = await db.query('SELECT * FROM results where test_id = $1 and user_id = $2', [test_id.rows[i].test_id, user_id])
                    if (result.rows[0] === undefined) {
                        console.log(result.rows[0])
                        test_list.push(JSON.parse((JSON.stringify(test.rows)).substr(1, JSON.stringify(test.rows).length - 2)))
                    } 
                }
                res.json(test_list)
            } else if (completed === 'true' && (user_id !== undefined)) {
                const user_division = await db.query('SELECT * FROM users where id = $1', [user_id])
                const test_id = await db.query('SELECT * FROM test_for_division where division_id = $1', [user_division.rows[0].division_id])
                let test_list = []
                for (let i = 0; i < test_id.rows.length; i++) {
                    const test = await db.query('SELECT * FROM tests where id = $1', [test_id.rows[i].test_id])
                    const result = await db.query('SELECT * FROM results where test_id = $1 and user_id = $2', [test_id.rows[i].test_id, user_id])
                    if (result.rows[0] !== undefined) {
                        test_list.push(JSON.parse((JSON.stringify(test.rows)).substr(1, JSON.stringify(test.rows).length - 2)))
                    }
                }
                res.json(test_list)
            } else {
                const user_division = await db.query('SELECT * FROM users where id = $1', [user_id])
                const test_id = await db.query('SELECT * FROM test_for_division where division_id = $1', [user_division.rows[0].division_id])
                let test_list = []
                for (let i = 0; i < test_id.rows.length; i++) {
                    const test = await db.query('SELECT * FROM tests where id = $1', [test_id.rows[i].test_id])
                    test_list.push(JSON.parse((JSON.stringify(test.rows)).substr(1, JSON.stringify(test.rows).length - 2)))
                }
                res.json(test_list)
            }
        } catch(e) {
            res.json([])
        }
    }
    async getOneTest(req, res) {
        const id = req.params.id
        const test = await db.query(`SELECT * FROM tests where id = $1`, [id])
        res.json(test.rows[0])
    }
    async updateTest(req, res) {
        const {id, title, describe} = req.body
        const test = await db.query('UPDATE tests set title = $1, describe = $2 where id = $3 RETURNING *', [title, describe, id])
        res.json(test.rows[0])
    }
    async deleteTest(req, res) {
        const id = req.params.id
        const del_TFD = await db.query(`DELETE FROM test_for_division where test_id = $1`, [id])
        const del_quests = await db.query(`DELETE FROM questions where test_id = $1`, [id])
        const del_results = await db.query(`DELETE FROM results where test_id = $1`, [id])
        const del_test = await db.query(`DELETE FROM tests where id = $1`, [id])
        res.send("Successfully deleted with questions, results and other settings")
    }
}

module.exports = new TestController()
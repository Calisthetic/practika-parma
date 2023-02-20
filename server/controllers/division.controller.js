const db = require('../db');

class DivisionController {
    async createDivision(req, res) {
        const {title} = req.body
        const exist = await db.query('SELECT * FROM divisions where title = $1', [title])
        if (exist.rows.length === 0) {
            const newDivision = await db.query('INSERT INTO divisions (title) values ($1) RETURNING *', [title])
            res.json(newDivision.rows[0])
        } else {
            res.send("Already exist")
        }

        const newDivision = await db.query('INSERT INTO divisions (title) values ($1) RETURNING *', [title])
        res.json(newDivision.rows[0])
    }
    async getDivisions(req, res) {
        const user_id = req.query.user_id
        if (user_id === null || user_id === '' || user_id === undefined) {
            const divisions = await db.query(`SELECT * FROM divisions`)
            res.json(divisions.rows)
        } else {
            const user_division_id = await db.query('select * from users where id = $1', [user_id]) 
            const division = await db.query('select * from divisions where id = $1', [user_division_id.rows[0].division_id])
            res.json(division.rows) 
        }
    }
    async getOneDivision(req, res) {
        const id = req.params.id
        const division = await db.query('SELECT * FROM divisions where id = $1', [id])
        res.json(division.rows[0])
    }
    async updateDivision(req, res) {
        const {id, title} = req.body
        const division = await db.query('UPDATE divisions set title = $1 where id = $2 RETURNING *', [title, id])
        res.json(division.rows[0])
    }
    async deleteDivision(req, res) {
        const id = req.params.id
        const del_division = await db.query(`DELETE FROM divisions where id = $1`, [id])
        res.send("Successfully deleted")
    }
}

module.exports = new DivisionController()
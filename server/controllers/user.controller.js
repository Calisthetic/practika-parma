
const db = require('../db');

class UserController {
    async createUser(req, res) {
        const {login, password, first_name, second_name, third_name, division_id} = req.body
        const exist_login = await db.query('SELECT * FROM users where login = $1', [login])
        const exist_name = await db.query('SELECT * FROM users where first_name = $1 and ' +
        'second_name = $2 and third_name = $3', [first_name, second_name, third_name])
        if (exist_login.rows.length !== 0) {
            res.send("User with this login is already exist")
        } else if (exist_name.rows.length !== 0) {
            res.send("User with this name is already exist")
        } else {
            const newUser = await db.query(`INSERT INTO users (login, password, first_name, second_name, third_name, division_id) 
                values ($1, $2, $3, $4, $5, $6) RETURNING *`, 
                [login, password, first_name, second_name, third_name, division_id])
            res.json(newUser.rows[0])
        }
    }
    async getUsersByDivision(req, res) {
        try {
            const division_id = req.query.division
            const login = req.query.login
            const password = req.query.password 
            if (division_id !== undefined) {
                const users = await db.query('select * from users where division_id = $1', [division_id])
                res.json(users.rows)
            } else if (login !== undefined && password !== undefined) {
                const users = await db.query('select * from users where login = $1 and password = $2', [login, password])
                if (users.rows[0] === undefined) {res.json([{}])} else {res.json(users.rows[0])}
            } else {
                const users = await db.query(`SELECT * FROM users`)
                res.json(users.rows)
            }
        } catch(e) {
            res.json([{}])
        } 
    }
    async getOneUser(req, res) {
        const id = req.params.id
        const user = await db.query(`SELECT * FROM users where id = $1`, [id])
        res.json(user.rows[0])
    }
    async updateUser(req, res) {
        const {id, login, password, first_name, second_name, third_name, division_id} = req.body
        const user = await db.query('UPDATE users set login = $1, password = $2, '+
            'first_name = $3, second_name = $4, third_name = $5, division_id = $6 where id = $7 RETURNING *', 
            [login, password, first_name, second_name, third_name, division_id, id])
        res.json(user.rows[0])
    }
    async deleteUser(req, res) {
        const id = req.params.id
        const results = await db.query(`DELETE FROM results where user_id = $1`, [id])
        const user = await db.query(`DELETE FROM users where id = $1`, [id])
        res.send("Successfully deleted with results")
    }
}

module.exports = new UserController()
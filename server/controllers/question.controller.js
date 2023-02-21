const db = require('../db');

class QuestionController {
    async createQuest(req, res) {
        const {test_id, title, describe, first_answer, second_answer, third_answer, fourth_answer, correct_answer} = req.body
        const newQuest = await db.query(`INSERT INTO questions (test_id, title, describe, first_answer, `+
            `second_answer, third_answer, fourth_answer, correct_answer) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, 
            [test_id, title, describe, first_answer, second_answer, third_answer, fourth_answer, correct_answer])
        res.json(newQuest.rows[0])
    }
    async getQuestsByTest(req, res) {
        try {
            const id = req.query.test
            const limit = req.query.limit
            if (id !== undefined) { 
                const quests = await db.query('SELECT * FROM questions where test_id = $1', [id])
                if (quests.rows[0] === undefined) {res.json([{}])} else {res.json(quests.rows)}
                //res.json(quests.rows)
            } else if (limit !== undefined) {
                const quests = await db.query('SELECT * FROM questions LIMIT $1', [limit]) 
                res.json(quests.rows)
            } else {
                const quests = await db.query('SELECT * FROM questions')
                res.json(quests.rows)
            }
        } catch(e) {
            res.json([{}])
        }
    }
    async getOneQuest(req, res) {
        const id = req.params.id
        const quest = await db.query('SELECT * FROM questions where id = $1', [id])
        if (quest.rows[0] === undefined) {res.json([{}])} else {res.json(quest.rows[0])}
        //res.send(quest.rows[0])
    }
    async updateQuest(req, res) {
        const {id, test_id, title, describe, first_answer, second_answer, third_answer, fourth_answer, correct_answer} = req.body
        const quest = await db.query('UPDATE questions set test_id = $1, title = $2, describe = $3, first_answer = $4, ' +
            'second_answer = $5, third_answer = $6, fourth_answer = $7, correct_answer = $8 where id = $9 RETURNING *', 
            [test_id, title, describe, first_answer, second_answer, third_answer, fourth_answer, correct_answer, id])
        res.json(quest.rows[0])
    }
    async deleteQuest(req, res) {
        const id = req.params.id
        const del_quest = await db.query(`DELETE FROM questions where id = $1`, [id])
        res.send("Successfully deleted")
    }
}

module.exports = new QuestionController()
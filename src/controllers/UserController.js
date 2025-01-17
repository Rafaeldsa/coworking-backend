const knex = require('../database/connection');
const { sendEmail } = require('./SessionController');

module.exports = {
  async index(req, res) {
    const users = await knex('users').select('*');

    res.json(users);
  },
  async create(req, res) {
    const { email, senha } = req.body;

    if (senha.length < 6) {
      throw new Error('Small password');
    }

    try {
      const existUser = await knex('users').where('email', email).select('id');
      if (existUser.length !== 0) {
        res.json({ message: 'E-mail already registered' });
      } else {
        const insertedUsers = await knex('users').insert({
          email,
          senha,
        });

        const user_id = insertedUsers[0];

        sendEmail(user_id, email);

        res.status(200).send({
          message: 'Successful registration',
        });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    try {
      const {
        nome,
        data_nascimento,
        cpf,
        endereco_pessoal,
        biografia,
        email,
        isAdmin,
      } = req.body;

      const userEmail = await knex('users')
        .where('id', id)
        .select('users.email');

      const email_user = userEmail[0].email;

      if ((email !== null, email_user !== email)) {
        await knex('users').where('id', id).update({ confirmed: false });
        sendEmail(id, email);
      }

      await knex('users').where('id', id).update({
        nome,
        data_nascimento,
        cpf,
        endereco_pessoal,
        biografia,
        email,
        isAdmin,
      });

      res.json({ message: 'Campos alterados!' });
    } catch (err) {
      res.json({ message: err.message });
    }
  },
};

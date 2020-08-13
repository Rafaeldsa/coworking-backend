const knex = require('../database/connection');
const { update } = require('../database/connection');

module.exports = {
  async index(req, res) {
    const users = await knex('users').select('*');

    res.json(users);
  },
  async create(req, res) {
    const { email, senha } = req.body;

    try {
      const existUser = await knex('users').where('email', email).select('id');
      if (existUser.length !== 0) {
        res.json({ message: 'Email já cadastrado!' });
      } else {
        await knex('users').insert({
          email,
          senha,
        });
        res.status(200).send({
          message: 'Cadastro realizado com sucesso!',
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
      } = req.body;
      await knex('users').where('id', id).update({
        nome,
        data_nascimento,
        cpf,
        endereco_pessoal,
        biografia,
        email,
      });

      res.json({ message: 'Campos alterados!' });
    } catch (err) {
      res.json({ message: 'Erro!' });
    }
  },
};

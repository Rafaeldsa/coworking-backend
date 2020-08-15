const knex = require('../database/connection');
const { update } = require('../database/connection');

module.exports = {
  async index(req, res) {
    const meetings = await knex('rooms')
      .join('meetings', 'rooms.id', '=', 'meetings.room_id')
      .select('*');

    const rooms = await knex('rooms').select('*');

    return res.status(200).json({ rooms, meetings });
  },

  async create(req, res) {
    const { name, workstation_id } = req.body;

    try {
      await knex('rooms').insert({
        workstation_id,
        name,
      });
      res.status(200).json({
        message: 'Room created',
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error',
      });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      await knex('rooms').where('id', id).update({
        name,
      });

      return res.status(201).json({
        message: 'Room changed',
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  },
  async delete(req, res) {
    const { room_id } = req.params;

    try {
      await knex('rooms').where('id', room_id).delete();
      return res.status(204).json({
        message: 'Room deleted',
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  },
};

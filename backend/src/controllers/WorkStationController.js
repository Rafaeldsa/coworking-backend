const knex = require('../database/connection');
const convertHourToMinutes = require('../utils/convertHourToMinutes');

module.exports = {
  async index(req, res) {
    const workStations = await knex('workstations').select('*');

    res.json(workStations);
  },
  async show(req, res) {
    const { id } = req.params;

    const workstation = await knex('workstations').where('id', id).first();

    if (!workstation) {
      return res.status(400).json({ message: 'WorkStation not found' });
    }

    const schedules = await knex('workstation-schedule')
      .join(
        'workstations',
        'workstation-schedule.workstation_id',
        '=',
        'workstations.id'
      )
      .where('workstations.id', id)
      .select(
        'workstation-schedule.id',
        'workstation-schedule.week_day',
        'workstation-schedule.from',
        'workstation-schedule.to'
      );

    const rooms = await knex('rooms')
      .join('workstations', 'rooms.workstation_id', '=', 'workstations.id')
      .where('workstation_id', id)
      .select('rooms.name');

    return res.json({ workstation, schedules, rooms });
  },
  async create(req, res) {
    const { name, description, schedule } = req.body;

    const trx = await knex.transaction();

    try {
      const insertedWorkStationsIds = await trx('workstations').insert({
        name,
        description,
      });

      const workStation_id = insertedWorkStationsIds[0];

      const wokrStationSchedule = schedule.map((scheduleItem) => {
        return {
          workStation_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx('workstation-schedule').insert(wokrStationSchedule);

      await trx.commit();

      return res.status(201).json({
        message: 'WorkStation criada',
      });
    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: err.message,
      });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      await knex('workstations').where('id', id).update({
        name,
        description,
      });

      return res.status(201).json({
        message: 'WorkStation alterada',
      });
    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: err.message,
      });
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    const trx = await knex.transaction();
    try {
      await trx('workstations').where('id', id).delete();

      await trx.commit();
      return res.status(204).json({
        message: 'Worsktation deleted',
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error',
      });
    }
  },

  async deleteSchedule(req, res) {
    const { schedule_id } = req.params;

    try {
      await knex('workstation-schedule').where('id', schedule_id).delete();
      return res.status(204).json({
        message: 'Schedule deleted',
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  },
};

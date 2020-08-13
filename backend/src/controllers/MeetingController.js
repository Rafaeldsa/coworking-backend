const knex = require('../database/connection');
const convertHourToMinutes = require('../utils/convertHourToMinutes');

module.exports = {
  async index(req, res) {
    const meetings = await knex('meetings')
      .join(
        'schedules-meeting',
        'meetings.id',
        '=',
        'schedules-meeting.meeting_id'
      )
      .select('*');

    res.json(meetings);
  },
  async create(req, res) {
    const { name, description, creator, room_id, schedules } = req.body;

    try {
      const insertedMeetingIds = await knex('meetings').insert({
        name,
        description,
        creator,
        room_id,
      });

      const meeting_id = insertedMeetingIds[0];

      const meetingSchedule = schedules.map((scheduleItem) => {
        return {
          meeting_id,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await knex('schedules-meeting').insert(meetingSchedule);

      return res.status(201).json({
        message: 'Meeting created',
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  },
};

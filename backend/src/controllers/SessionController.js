const knex = require('../database/connection');
require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

module.exports = {
  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const authUser = await knex('users').where('email', email).select('*');

      console.log(authUser[0].senha);

      if (authUser[0] === null) {
        throw new Error('Usuario não cadastrado!');
      }
      if (!authUser[0].confirmed) {
        throw new Error('Por favor confirme seu email');
      }

      if (senha === authUser[0].senha) {
        var token = jwt.sign({ email }, process.env.SECRET, {
          expiresIn: 604800, // expires in 1 week
        });

        res.header('authorization', token);
        return res.json({ auth: true, token: token });
      } else {
        res.status(404).json({
          message: 'User not found!',
        });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  verifyJWT(req, res, next) {
    var token = req.headers['authorization'];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });

      // se tudo estiver ok, salva no request para uso posterior
      req.userEmail = decoded.email;
      next();
    });
  },

  async sendEmail(id, email) {
    try {
      var emailToken = jwt.sign({ id }, process.env.EMAIL, {
        expiresIn: 604800, // expires in 1 week
      });

      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.SENHA,
        },
      });

      const url = `http://localhost:3001/session/confirmation/${emailToken}`;

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Confirm Email',
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  },

  async confirmation(req, res) {
    try {
      const { id } = jwt.verify(req.params.token, process.env.EMAIL);
      await knex('users').where('id', id).update({
        confirmed: true,
      });

      return res.redirect('http://localhost:3000/workstations/list");
    } catch (error) {
      throw new Error('Erro ao confirmar email!');
    }
  },
};

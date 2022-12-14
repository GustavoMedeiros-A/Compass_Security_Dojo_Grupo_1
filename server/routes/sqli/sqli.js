const router = require('express').Router();
const { errHandling } = require('../../utils/utils');
const cookieParser = require('cookie-parser');
const { getUserByName } = require('../../service/service');
const { check } = require('express-validator');

router.use(cookieParser());

const renderData = {};

router.get(
	'/sqli',
	[check('nome').escape()], async (req, res) => {
		const { nome } = req.query;
		renderData.hasUsers = 'false';
		renderData.busca = nome;
		renderData.busca = nome;
		if (nome != undefined) {
			const { rows } = await getUserByName(nome);
			if (rows[0]) renderData.hasUsers = 'true';
			renderData.busca = nome;
			renderData.users = rows;
		}

		res.render('sqli', renderData);
	}
);

module.exports = router;

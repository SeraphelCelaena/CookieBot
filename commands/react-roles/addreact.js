// imports
const reactRolesModel = require("../../models/reactRolesModel.js");

module.exports = {
	name: 'addreact',
	aliases: [],
	permissions: [],
	help: "!addreact [NAME OF THINGY] [MESSAGE ID] [EMOJI] [ROLE ID]",
	description: '[WIP] adds a react role tied to a message and a role',
	async execute(client, message, commandName, arguments, Discord) {
		// if sends nothing then nothing happens and warns user
		// sanitize arguments
		// if successful then adds the thing to database
		// i just realized i probably need to make a handler for this
		// oh well
	}
}

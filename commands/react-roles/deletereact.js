const reactRoleModel = require ('../../models/reactRolesModel.js');

module.exports = {
	name: 'deletereact',
	aliases: ["removereact", "delreact"],
	permissions: [],
	help: '!deletereact [NAME OF THINGY]',
	description: 'Remove a react role',
	async execute(client, message, commandName, arguments, Discord) {
		//bariabl
		roleReactName = arguments[0];
		try {
			// find role if possible
			const reactDelete = await reactRoleModel.findOneAndDelete({roleReactName:roleReactName});
			if (!reactDelete) return message.channel.send("Invalid react role name");

		} catch(error) {
			console.log(`[Error] deletereact - ${error}`);
		}
	}
}

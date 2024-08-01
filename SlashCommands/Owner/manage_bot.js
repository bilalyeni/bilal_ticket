const { Client, CommandInteraction } = require("discord.js");
const Discord = require(`discord.js`)
const glob = require("glob")
module.exports = {
    name: "manage_bot",
    description: "Botu yönetin",
    type: 'CHAT_INPUT',
    premium: true,
    
    run: async (client, interaction, args) => {

      if(!client.config.developers.includes(interaction.user.id)) return interaction.followUp(`🔒 **Bu komut sadece Bilal'e özeldir!**`)

      
        let clientapp = client.application ? await client.application.fetch().catch(e => false) : false;
    let guild = client.guilds.cache.get("905075946426613760")
    
    const control = new Discord.MessageEmbed()
      .setColor(client.config.color.main)
      .setAuthor(`${client.user.username} | Bot-Control-Panel`, client.user.displayAvatarURL())
      .setDescription(`<a:pingpong:906791053170987028> **Bot-File-Path:**
\`\`\`yml
${process.cwd()}
\`\`\`
<a:pingpong:906791053170987028> **Host-Server:**
\`\`\`yml
${String(Object.values(require(`os`).networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i ?.family === `IPv4` && !i ?.internal && i ?.address || []), [])), [])).split(".")[3]} IPv4
\`\`\`
${clientapp ? `<a:pingpong:906791053170987028> **Bot-Application-Information:**
\`\`\`yml
Bot Username: ${clientapp.name} 
${clientapp.owner.discriminator ? "Application-Owner: " + clientapp.owner.tag : "Application-Team: " + clientapp.owner.name + "\nApplication-Members: " + clientapp.owner.members.map(uid => `${uid.user.tag}`).join(", ") + "\nTeam-Owner: " + `${guild.members.cache.get(clientapp.owner.ownerId) && guild.members.cache.get(clientapp.owner.ownerId).user ? guild.members.cache.get(clientapp.owner.ownerId).user.tag : clientapp.owner.ownerId}`} 
Icon: ${clientapp.iconURL()}
\`\`\`
<a:pingpong:906791053170987028> **About me:**
\`\`\`yml
${clientapp.description ? clientapp.description : "❌ NO DESCRIPTION YET!"}
\`\`\``
          : ""}
`)
      
      interaction.followUp({ embeds: [control], components: [
        new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageSelectMenu()
			  .setCustomId('manage_bot')
			  .setPlaceholder(`Manage The "Premium Tc Bot" ${client.user.username}`)
			  .addOptions([
          { label: `Shutdown Bot`, description: `Shutdown the bot incase of emergencies!`, value: `stop_client`, emoji: `905426273952739329` },
          { label: `Rename Bot`, description: `Rename the Discord Bot to your chosen one!`, value: `rename_client`, emoji: `📝` },
          { label: `Change Avatar`, description: `Change the Discord Bot's Avatar to a new one!`, value: `changeav_client`, emoji: `📸` },
        ]),
			)
      ]})
      }

}


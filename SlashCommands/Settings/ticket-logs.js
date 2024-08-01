const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const db = require(`quick.db`)

module.exports = {
    name: "ticket-logs",
    description: "Ticket-log kanalını ayarlayın",
    premium: true,
    options: [
    {
        name: "system",
        description: "Hangi Bilet Sistemini kurmak istediğinizi seçin",
        type: "STRING",
        required: true,
        choices: [
          { name: `1. Ticket-Sistemi`, value: `1` },
          { name: `2. Ticket-Sistemi`, value: `2` },
          { name: `3. Ticket-Sistemi`, value: `3` },
          { name: `4. Ticket-Sistemi`, value: `4` },
          { name: `5. Ticket-Sistemi`, value: `5` },
          { name: `6. Ticket-Sistemi`, value: `6` },
          { name: `7. Ticket-Sistemi`, value: `7` },
          { name: `8. Ticket-Sistemi`, value: `8` },
          { name: `9. Ticket-Sistemi`, value: `9` },
          { name: `10. Ticket-Sistemi`, value: `10` },
          { name: `11. Ticket-Sistemi`, value: `11` },
          { name: `12. Ticket-Sistemi`, value: `12` },
          { name: `13. Ticket-Sistemi`, value: `13` },
          { name: `14. Ticket-Sistemi`, value: `14` },
          { name: `15. Ticket-Sistemi`, value: `15` },
          { name: `BETA Ticket-Sistemi`, value: `Beta` },
        ]
      },
      {
          name: "channel",
          description: "ticket log kanalı",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true,
      }
    ], 
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      let s = interaction.options.getString('system');
      let channel = interaction.options.getChannel("channel");
const role = db.get(`adminrole_${interaction.guild.id}${s}`);

      if(!role) return interaction.followUp(`${client.emoji.wrong} **Bilet sistemi henüz kurulmamış! Önce onu ayarlayın!**`)
      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: `${client.emoji.wrong} **Bu komutu bilet sistemini yönetmek için kullanamazsınız!**`, ephemeral: true})


      const panel = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`📨 \` ${s}. Ticket-Sistemi \` için-Log kanalı ayarlandı`)
      .setDescription(`Bu kanal artık **Ticket-Log** kanalı olarak ayarlanmıştır! Yeni bilet kapanışları burada yayınlanacaktır!`)
      .setFooter(`Powered by bilalyeniofficial`, interaction.guild.iconURL())

     
      
      interaction.followUp({ content: `${client.emoji.correct} Ticket-Log kanalı olarak **${channel.name} (${channel.id}) ayarlandı!` })

      db.set(`ticketlogs_${interaction.guild.id}`, channel)
      client.channels.cache.get(channel.id).send({ embeds: [panel] })
    },
};
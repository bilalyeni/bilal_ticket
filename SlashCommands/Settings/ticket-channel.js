const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const db = require(`quick.db`)

module.exports = {
    name: "ticket-setup",
    description: "Ticket sistemini kurun.",
    premium: true,
    options: [
    {
        name: "system",
        description: "Hangi bilet sistemini kurmak istediğinizi seçin.",
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
          description: "ticket panel kanalı",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true,
      },
      
      {
            name: "role",
            description: "Biletleri yöneten yetkili rolü",
            type: 8,
            required: true,
      },
      {
        name: "button_label",
        description: "Butondaki yazı",
        type: "STRING",
        required: true,
      },
      {
        name: "button_emoji",
        description: "Butondaki emoji",
        type: "STRING",
        required: true,
      },
      {
        name: "embed_title",
        description: "Embeddeki başlık",
        type: "STRING",
        required: true,
      },
      {
        name: "embed_desc",
        description: "Embeddeki metin",
        type: "STRING",
        required: true,
      },
      {
        name: "embed_footer",
        description: "Embeddeki footer",
        type: "STRING",
        required: true,
      },
      {
        name: "embed_thumbnail",
        description: "Embeddeki resim",
        type: "STRING",
        required: false,
      },
      {
        name: "ticket_open_msg",
        description: "Bilet açma mesajı [Boşluk eklemek için +n+ kullanın]",
        type: "STRING",
        required: false,
      },
      {
        name: "ticket_channel_name",
        description: "Bilet kanalları için isim {user} = bilet sahibi kullanıcı adı",
        type: "STRING",
        required: false,
      },
      {
          name: "category",
          description: "ticket kategorisi",
          type: "CHANNEL",
          channelTypes: ["GUILD_CATEGORY"],
          required: false,
      },
      
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
      let category = interaction.options.getChannel("category");
      let role = interaction.options.getRole('role');
      let title = interaction.options.getString('embed_title');
      let message = interaction.options.getString('embed_desc');
      let thumbnail = interaction.options.getString('embed_thumbnail');
      let footer = interaction.options.getString('embed_footer');
      let msg = interaction.options.getString('ticket_open_msg');
      let label = interaction.options.getString('button_label');
      let emoji = interaction.options.getString('button_emoji');
      let ticketname = interaction.options.getString('ticket_channel_name') || `ticket-{user}`;
      let check = await interaction.guild.channels.cache.get(channel.id);

      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: `${client.emoji.wrong} **You cannot use this Command to Manage the Ticket-System!**`, ephemeral: true})

      if(!check) return interaction.followUp({ content: `${client.emoji.wrong} The args you provide either isn't a channel, or I can't view the selected channel.` })

      const panel = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(title)
      .setDescription(`${message || `Open a ticket for ${interaction.guild.name}`}`)
      .setImage(thumbnail)
      .setFooter(footer)

      const button = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(label)
        .setStyle(`DANGER`)
        .setEmoji(emoji)
        .setCustomId(`create_ticket${s}`)
      ])
      const embed = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`${client.emoji.correct} Bilet Sistemi Kuruldu`)
        .setDescription(`Bilet sisteminizi başarıyla kurdum! Logları ayarlamak için \`/ticket-logs\` kullanın!`)
      .addField(`:1234: Sistem Numarası:`, `**${s}. Ticket-System**`)
      .addField(`${client.emoji.manage} Ticket Kanalı:`, `**${channel} (${channel.id})**`)
      .addField(`${client.emoji.manage} Ticket Kategorisi:`, `**${category || `_\` Ayarlanmamış, Varsayılan Kullanılıyor \`_`}**`)
      .addField(`${client.emoji.manage} Admin Rolü:`, `**${role} (${role.id})**`)
        .addField(`${client.emoji.preview} Ticket Kanal İsmi`, `\`${ticketname}\` (*\`{user}\` değişkeni ticket ismi  olarak gösterilecektir*)`)
        .addField(`${client.emoji.preview} Ticket Mesajı (Paneldeki)`, `${message || `Open a ticket for ${interaction.guild.name}`}`)
      .addField(`${client.emoji.preview} Ticket Mesajı (Açıldığında)`, msg.split("+n+").join("\n"))
      
      db.set(`ticketmsg_${interaction.guild.id}${s}`, msg.split("+n+").join("\n"));
      if(category) db.set(`category_${interaction.guild.id}${s}`, category.id)
      db.set(`adminrole_${interaction.guild.id}${s}`, role.id);
      db.set(`ticketname_${interaction.guild.id}`, ticketname);
      interaction.followUp({ embeds: [embed] })

      client.channels.cache.get(channel.id).send({ embeds: [panel], components: [button] })
    },
};
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const client = require("../index.js")
const { Formatters } = require('discord.js');
const { MessageEmbed } = require("discord.js")
const discordTranscripts = require('discord-html-transcripts');
const db = require(`quick.db`)
client.on('modalSubmit', async (modal) => {
  if(modal.customId === `close-modal`) {
  const logs = db.get(`ticketlogs_${modal.guild.id}`) || null;
    const firstResponse = modal.getTextInputValue('closeText-modal')
    const attachment = await discordTranscripts.createTranscript(modal.channel);
    const opener = db.get(`Ticketopener_${modal.channel.id}`)
                    
        const embed = new MessageEmbed()
        .setColor(client.config.color.purple)
        .setTitle(`${client.emoji.loading} Deleting the Ticket...`)
        .setDescription(`*Bilet yaklaşık 5 saniye içinde silinecektir!*`)
        .setFooter({text: client.config.clientFooter, iconURL: client.config.clientLogo })

        modal.reply({ embeds: [embed] })
            setTimeout(() => {
                    modal.channel.delete();
                }, 1000 * 4.3);
    
        const tcopener = modal.guild.members.cache.get(opener.id)
        const closed = new MessageEmbed()
    .setTitle(`${client.emoji.manage} | TICKET KAPATILDI`)
          .setColor(`#2b2d30`)
          .addField(`**TARAFINDAN AÇILDI:**`, `<@${tcopener.user.id}>\`\`\`\n${tcopener.user.username}(${tcopener.user.id})\n\`\`\``)
    .addField(`**TARAFINDAN KAPATILDI:**`, `<@${modal.user.id}>\`\`\`\n${modal.user.username}(${modal.user.id})\n\`\`\``)
    .addField(`**SEBEP:**`, `${Formatters.codeBlock('markdown', firstResponse) || "`BELİRTİLMEMİŞ`"}`)
    .setFooter(`TurkishLine Ticket Systems`)
        

  client.channels.cache.get(logs.id).send({ embeds: [closed], files: [attachment]})
  }
})
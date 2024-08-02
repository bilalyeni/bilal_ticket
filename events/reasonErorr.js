const client = require("../index.js")
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "error_reasons") {
    interaction.reply({ content: "**ErrCode'un nedenleri: \`hHa_8\`**\n``\n[-] Yönetici Rolü Silinmiş Olabilir / Bot Role Erişemiyor\n[-] Bilet Kategorisi Silinmiş Olabilir\n[-] Veritabanı Hata Verdi ve Yönetici Rolünü Kaydetmedi\n[+] Bu Nedenlerden Hiçbiri Neden Değilse, DM bilalyeniofficial (821715152520609833)\n```", ephemeral: true })
  }
})
// Dont Remove my Username and Tag, as if there is ERRORs, I'll probs Know a FIX.
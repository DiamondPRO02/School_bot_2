module.exports = {
    name: 'ban',
    permissions: "BAN_MEMBERS",
    guildOnly: true,
    args: true,
    usage: '<user>',
    execute(message, system, args) {
            let taggedUser = message.mentions.users.first();
        // If we have a user mentioned
        if (taggedUser) {
            // Now we get the member from the user
            let member = message.guild.member(taggedUser);
            // If the member is in the guild
            if (member) {
                member.ban(member)
                .then(() => {
                    // We let the message author know we were able to ban the person
                    message.reply(`${system.lang.ban.have_tag} ${taggedUser.tag}`);
                })
                .catch(err => {
                    // This is generally due to the bot not being able to ban the member: 
                    //either due to missing permissions or role hierarchy
                    message.reply(system.lang.ban.cant_kick);
                    // Log the error
                    console.error(err);
                });
            } else {
                // The mentioned user isn't in this guild
                message.reply(system.lang.ban.no_user_found);
            }
        }
        // If no user was mentioned
        else {
        message.reply(system.lang.ban.no_tag);
        }
    }
}
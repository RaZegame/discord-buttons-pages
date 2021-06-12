
exports.pages = async function(client, message, pages, timeout, disbut, style){
    const Discord = require("discord.js");
    require("discord-buttons");
    var timeForStart = Date.now();
    if(pages.length >= 5){
        console.error("Amount of pages must be 4 or below!");
        return;
    }
    const pageMovingButtons1 = new disbut.MessageButton()
    .setID(`forward_button`)
    .setLabel("")
    .setEmoji("⏩")
    .setStyle(style)
    const pageMovingButtons2 = new disbut.MessageButton()
    .setID(`back_button`)
    .setLabel("")
    .setEmoji("⏪")
    .setStyle(style)
    var pageMovingButtons = new disbut.MessageActionRow()
    .addComponent(pageMovingButtons2)
    .addComponent(pageMovingButtons1)
    var currentPage = 0;
    var array = pages[currentPage];
    array.push(pageMovingButtons);
    message.edit(message.content, {components: array});
    client.on("clickButton", async b=>{
        console.log("wee")
        if(Date.now() - timeForStart >= timeout)return;
        if(b.message.id == message.id){
        if(b.id == "back_button"){
            if(currentPage - 1 > 0){
                currentPage = pages.length - 1
            } else{
                currentPage -= 1;
            }
        } else if(b.id == "forward_button"){
            if(currentPage + 1 == pages.length){
                currentPage = 0;
            } else{
                currentPage += 1;
            }
            console.log("woo")
        }
        if(b.id == "back_button" || b.id == "forward_button"){
            var array = pages[currentPage];
            array.push(pageMovingButtons);
            message.edit(message.content, {components: array});
            b.defer(true);
        }
    } else{
        b.defer(true);
    }
    })
}

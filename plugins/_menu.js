const {
    inrl,
    commands,
    send_alive,
    send_menu,
    lang,
    personalDB,
    mode
} = require('../lib')

inrl({
	pattern: 'list',
	desc: lang.LIST.DESC,
	react: "💯",
	type: 'info',
	fromMe: mode
}, async (message) => {
	let count = 1,
		list = "";
	commands.map((cmd => {
		if (cmd.pattern && cmd.desc) {
			list += `${count++} *${cmd.pattern.replace(/[^a-zA-Z0-9,-]/g,"")}*\n_${cmd.desc}_\n\n`;
		} else {
			list += `${count++} *${cmd.pattern?cmd.pattern.replace(/[^a-zA-Z0-9,-]/g,""):''}*\n`
		}
	}));
	return await message.send(list);
});

inrl({
    pattern: "menu",
    desc: lang.MENU.DESC,
    react: "📰",
    type: 'whatsapp',
    fromMe: mode
}, async (message, match) => {
    return await send_menu(message, 'non button');
});

inrl({
    pattern: "alive",
    desc: lang.ALIVE.DESC,
    react: "🥰",
    type: 'info',
    usage:lang.ALIVE.HELP,
    fromMe: mode
}, async (message, match) => {
    if(match == "get" && message.isCreator){
	    const {alive} = await personalDB(['alive'], {content:{}},'get');
	    return await message.send(alive);
    } else if(match && message.isCreator){
	    await personalDB(['alive'], {content: match},'set');
	    return await message.send('*success*');
    }
    const {alive} = await personalDB(['alive'], {content:{}},'get');
    return await send_alive(message, alive);
});



inrl({
    pattern: "moreinfo",
    desc: "hi",
    react: "🥰",
    type: 'info',
    usage:lang.ALIVE.HELP,
    fromMe: mode
}, async (message, match) => {
    	return await message.send(`*🤗❤️ WELCOME TO  CRYPTO Trading 💸*

*හායි යාලුවනේ, ඉතින් කොහොමද 😊❤️*
 
*Crypto Trading  වලින්  ජීවිතය සාර්ථක කර ගන්න ඔයත් එන්න 💸*

*♦Crypto Trading වලින් LIMIT එකක් නැතුව සල්ලි හම්බකරමු.*

*♦ඔයාගේ DREAMS නැත්නම් හීන හැබෑ කරගමු.*

*♦ඔයාගේ ජීවිතේ ඔයාටවත් හිතා ගන්න බැරි සාර්ථකත්වයකට යමු.*

*.මේ සියල්ල  Crypto Trading  වලින් සාර්ථක කර ගමු 😎❤️*

හැකිතාක් ඔබෙ මිතුරන්ව අපගෙ සමූහයට එක්කාසු කරගෙන ඔවුන් සමග අපිත් සම්ග එකට දියුනු වන්න.♥🤩

📞ඔබට මෙය ගැන් වැඩි විස්තර දැන ගැනීමට මෙම දුරකතනයක ඇමතුමක් හෝ whatsapp වෙතින් කරුනු යොමු කරන්න								   

`);
});
	    

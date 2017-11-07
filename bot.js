const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '*';
const version = "2.1";
const ytdl = require('ytdl-core');
const MojangAPI = require('mojang-api');
const request = require('request');
const os 	= require('os-utils');
const cpuStat = require('cpu-stat');
const fs = require('fs');


//bot.registry.registerGroup('random', 'Random');
//bot.registry.registerDefaults();
//bot.registry.registerCommandsIn(__dirname + '/commands')

var servers = {};

function play(connection, message) {
  var server = servers[message.guild.id];
  server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter:'audioonly'} ));
  server.queue.shift();
  server.dispatcher.on('end', function(){
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}

bot.on("ready", function(){

  fs.readFile("onstart.txt", "utf8", function (error, data) {
    console.log(data);
  });

  console.log('Le bot est prêt !');
  bot.user.setStatus('Ban Jeddak :c','', 1);
});

/*bot.on('guildMemberAdd', function(member) {
  member.guild.channels.find('name', 'general').send(member.toString() + ' bienvenue sur le serveur de :herb: LaFrenchWeed :herb: ! Si tu a des questions n\'hésite pas à t\'adresser aux Chefs de réseaux !')
});*/

bot.on("message", function(message){
  if(message.author.equals(bot.user)) return;
  if(!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");
  switch (args[0].toLowerCase()) {
      case 'cheat':
        message.delete();
        message.channel.send('Je crois que j\'ai vu un cheater ! Ah non ne t\'inquiète pas c\'est juste un membre de la LFW :smirk: ' );
        break;
      case 'help':
        message.delete();
        message.channel.send('```Bienvenue dans l\'aide du bot Pasblo Escobar ! \n\n\nPour m\'utiliser veuillez vous servir du préfixe "*". Voici la liste des différentes commandes disponnibles : \n\n  help : affiche l\'aide \n  cheat : ??? \n  info : affiche différentes informations sur le bot (en cours de test) \n  profil <pseudo> : profil des joueurs sur Epicube \n  guilde <nom de la guilde> : bientôt ^^```' );

        break;
      case 'info':
        message.delete();
        message.channel.send('Je suis Pablo Escobar, un bot développé par le grand et le fameux C9H13N et je suis actuellement en ' + version);
        break;
      case 'usage':
        message.delete();
        var ramTotal = os.totalmem();
        var ramTotal = os.totalmem();
        var ramLibre = os.freemem();
        var nbCoeurs = os.cpuCount();
        var versionString = require('child_process').execSync('ver').toString().trim()

        //console.log(versionString);



        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        //console.log(hour + ' : ' + min + ' : ' + sec);

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;



        cpuStat.usagePercent(function(err, percent, seconds) {
            if (err) {
              return console.log(err);
            }
            console.log('Informations système : ');
            console.log('');
            console.log('');
            console.log('OS : ' + versionString);
            console.log('Nombres de coeurs : '+ nbCoeurs);
            console.log('Processeur : '+ percent);
            console.log('RAM : ' + ramLibre + ' / ' + ramTotal);
            console.log('');
            console.log('Heure : ' + hour + ':' + min + ':' + sec);

        });



        //message.channel.send('``` Test ```   ' + versionString + '``` test2 ```');
        //message.channel.send('coucou')

        break;
      default:
        message.delete();
        //message.channel.send('Commande invalide, *help vous permet de connaître la liste des commandes disponnibles.');

        break;
      /*case 'embed':
        const embed = new Discord.RichEmbed()
          .setTitle('Bonjour à tous !')
          .addBlankField()
          .addField('Test TITRE', 'Test DESCRIPTION', true)
          .addField('Test TITRE', 'Test DESCRIPTION', true)
          .addField('Test TITRE', 'Test DESCRIPTION')
          .setColor(0x249e3a)
          .setFooter('Pablo Escobar | C9H13N')
          .setTimestamp(new Date())
        message.channel.send({embed});
        break;*/
      /*case 'play':
        message.delete();
        if(!args[1]){
          message.channel.send('Vous devez précisier le lien de la musique.');
          return;
        }
        if(!message.member.voiceChannel){
          message.channel.send('Vous n\'êtes pas dans un channel vocal.');
          return;
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
        }
        var server = servers[message.guild.id];

        server.queue.push(args[1]);

        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
          play(connection, message);
        });
        break;*/
      /*case 'skip':
        message.delete();
        var server = servers[message.guild.id];
        if (server.dispatcher) server.dispatcher.end();
        break;*/
      case 'profil':
        message.delete();
        if(!args[1]){
          message.channel.send('Merci de précisier le pseudo du joueur');
          return;
        }

        //Variables personelles
        var merde1 = 'unmecenaustralie'
        var merde2 = 'unefilleenalaska'
        var bg = 'c9h13n'
        var second = 'c21h30no2'
        var veapsy = 'veapsy'
        var pseudoFinal = ' '
        var pseudo = args[1]
        var messageGuilde = ''
        var messageGuilde2 = ''

        console.log('Le discord (' + message.guild.name + ') vient de demander les stats du joueur : ' + pseudo);

        //Variables Stats
        var url = 'https://stats.epicube.fr/player/'+pseudo+'.json?with=stats'
        var urlNoJson = 'https://stats.epicube.fr/player/'+pseudo
        var json = ''
        var uuid = 'undefined'
        var is_connected = ''
        var player_name = ''
        var grade = ''
        var ban = ''
        var nom_guilde = ''
        var niveau_guilde = ''
        var couleur = ''
        var xp_guilde = ''
        var on_server = ''
        var last_logout = ''
        var error = false

        request({

          uri: url,
        }, function(error,response,body){

          try {
            json = JSON.parse(body)
          } catch(err) {
            error = true
          }


          try {
          //json = JSON.parse(body)
          is_connected = json.is_online;
          grade = json.group_name;
          ban = json.is_ban;
          nom_guilde = json.guild.name;
          niveau_guilde = json.guild.level;
          uuid = json.player_uuid;
          player_name = json.player_name;
          xp_guilde = json.guild.experience;
          last_logout = json.last_logout;
        } catch(err) {
            try {
              is_connected = json.is_online;
              grade = json.group_name;
              ban = json.is_ban;
              uuid = json.player_uuid;
              player_name = json.player_name;
              last_logout = json.last_logout;


            } catch(err) {
              console.log('Ce joueur ne possède pas de guilde, nous allons néanmoins afficher ses stats')
              return;
            }

          if (uuid == '') {
            message.channel.send('Ce joueur ne s\'est jamais connecté sur Epicube :rolling_eyes: ');
          }

          //message.channel.send('Ce joueur ne s\'est jamais connecté sur Epicube :rolling_eyes: ');
          error = true
          return;
        }
          //console.log(json);aa

        });
          //console.log(json.player_uuid);


        //var json={id:"12",data:"123556",details:{"name":"alan","age":"12"}}




        if(args[1].toLowerCase() == merde1){
          message.channel.send('Tu croyais vraiment que j\'allais afficher les stats de ce merdeux ?');
          error = true
          return;
        }

        if(args[1].toLowerCase() == merde2){
          message.channel.send('JAMAIS je n\'afficherai les stats de ce genre de personne odieuse et stupide. De toute façon elle se fait perfect par le grand maître :wink: ');
          return;
        }

        var user = args.toString().replace('profil,', '');


        if(grade == 'coucou'){
          error = true
          //console.log(console.error(););
        }


        setTimeout(function() {



          MojangAPI.nameToUuid(user, function(err, res) {
          if (err)
            console.log('Erreur MojangAPI');
          else {
            //console.log(res[0].name + "? No, they're " + res[0].id + " to me.");
            //global.pseudo = res[0].name
            //global.uuid = res[0].id

            if (args[1].toLowerCase() == bg) {
              pseudoFinal = ':zap: **'+player_name+'** :zap:'
            } else if (args[1].toLowerCase() == veapsy) {
              pseudoFinal = ':heart: **'+player_name+'** :heart:'
            } else if (args[1].toLowerCase() == second) {
              pseudoFinal = ':herb: **'+player_name+'** :herb:'
            } else {
              pseudoFinal = '**'+player_name+'** '
            }


            if (is_connected == true){
              couleur = '0x249e3a'
              on_server = json.on_server.charAt(0).toUpperCase() + json.on_server.slice(1);
            } else {
              couleur = '0xaf1616'
              on_server = 'Déconnecté'
            }

            if (nom_guilde == '') {
              messageGuilde = 'Aucune'
              messageGuilde2 = ''
            } else {
              messageGuilde = ' / Niveau : '
              messageGuilde2 = ' / Expérience : '
            }



            //console.log(gradeStaff + grade);

            global.errorV2 = 'false'

            request({
              uri: url,
            }, function(error,response,body){
              try {
                json = JSON.parse(body)
              } catch(err) {
                global.errorV2 = 'true'
                //console.log('bijour');
                //console.log(errorV2);
              }
            if (errorV2 == 'true') {
              message.channel.send('Ce joueur ne s\'est jamais connecté sur Epicube :rolling_eyes: ');
            } else {

              var gradeStaff = ''
              var staffValue = 0
              //Admin = 1 / Resp-Modo = 2 / Staff = 3 / Helper = 4 / Dev = 5 / Modo = 6 / 7 = EpicMember / 8 = Ami / 9 = Ambassadeur

            if(grade.indexOf('admin') > -1) {
              staffValue = 1
              gradeStaff = '[Administrateur] / '
              grade = grade.replace('admin-', '');
            }
            if(grade.indexOf('helper') > -1) {
              staffValue = 4
              gradeStaff = '[Helper] / '
              grade = grade.replace('helper-', '');
            }
            if(grade.indexOf('dev') > -1) {
              staffValue = 5
              gradeStaff = '[Développeur] / '
              grade = grade.replace('dev-', '');
            }
            if(grade.indexOf('resp-modo') > -1) {
              staffValue = 2
              gradeStaff = '[Responsable Modérateur] / '
              grade = grade.replace('resp-modo-', '');
            }
            if(grade.indexOf('moderateur') > -1) {
              staffValue = 6
              gradeStaff = '[Modérateur] / '
              grade = grade.replace('moderateur-', '');
            }
            if(grade.indexOf('staff') > -1) {
              staffValue = 3
              gradeStaff = '[Staff] / '
              grade = grade.replace('staff-', '');
            }
            if(grade.indexOf('ambassadeur') > -1) {
              staffValue = 9
              gradeStaff = '[Ambassadeur]'
              grade = grade.replace('ambassadeur', '');
            }
            if(grade.indexOf('epicmember') > -1) {
              staffValue = 7
              gradeStaff = '[EpicMember] / '
              grade = grade.replace('epicmember-', '');
            }
            if(grade.indexOf('ami') > -1) {
              staffValue = 8
              gradeStaff = '[Ami] / '
              grade = grade.replace('ami-', '');
            }

              last_logout = last_logout.replace(' ', ' / ');


            if (grade == 'vip'){
              grade = '[VIP]'
            } else if (grade == 'vip+') {
                grade = '[VIP+]'
            } else if (grade == 'vip++') {
                grade = '[EpicVIP]'
            } else if (grade == 'vip+++'){
              grade = '[Legend]'
            } else if (grade == 'joueur') {
              grade = '[Joueur]'
            } else if (grade == 'vip-') {
              grade = '[Joueur]'
            }

            if (ban == true) {
              ban ='Oui'
            } else {
              ban = 'Non'
            }



              const embed = new Discord.RichEmbed()
                .setTitle(pseudoFinal)
                .setThumbnail('https://crafatar.com/avatars/'+pseudo+'.png')
                .addBlankField()
                .addField('Pseudo', player_name, true)
                .addField('UUID', uuid, true)
                .addField('Grade',gradeStaff + grade)
                .addField('Guilde', nom_guilde + messageGuilde + niveau_guilde + messageGuilde2 + xp_guilde, true)
                .addField('Banni', ban)
                .addField('Actuellement connecté', on_server, true)
                .addField('Dernière connection', last_logout, true)
                .setURL(urlNoJson)
                .setColor(couleur)
                .setFooter('Pablo Escobar | C9H13N')
                .setTimestamp(new Date())
              message.channel.send({embed});
            }
            });

          }
          });
        }, 600);


          break;



      /*case 'stop':
        message.delete();
        var server = servers[message.guild.id];
        if (message.guild.voiceConnection)
        {
            for (var i = server.queue.length - 1; i >= 0; i--)
            {
                server.queue.splice(i, 1);
         }
            server.dispatcher.end();
        }﻿


        break;*/
      //case 'coucou':


  }

});



bot.login(process.env.BOT_TOKEN);

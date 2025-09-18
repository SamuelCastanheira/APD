function auto_email() {

  /**Definindo os endereços de email */
  const BCC = "castanheira.samuel@graduacao.uerj.br"
  const CC = "samuel@gmail.com";
  const CCO = "samuel2@gmail.com";
  const LABEL = "Problemas-SetorA";
  
  var label = GmailApp.getUserLabelByName(LABEL);
  
  if (!label)
  {
    label = GmailApp.createLabel(LABEL);
  }

  var threads = GmailApp.getInboxThreads();
  threads.forEach
  ((thread) =>
  {
      var messages = GmailApp.getMessagesForThread(thread);
      messages.forEach 
      ((message) =>
      {
        if (message.isUnread)
        {
          const regex = /@graduacao.uerj.br/;
          if (regex.test(message.getFrom()))
          {
            if (thread.getLabels().includes(label) == false)
            {
              thread.addLabel(label);
            }
            message.reply
            (
              '',
              {
                bcc: BCC,
                cc: CC,
                htmlBody: '<p>Estamos cientes da sua solicitação e em breve retornaremos com mais informações!</p>'+
                          '<br>'+
                          '<p>Atensiosamente, <acronym title="Detartamento de Tecnologia da Informação">DTI</acronym></p>',
                subject:  'Solicitação recebida'
              }
            );
            message.markRead();
            thread.moveToArchive();
          }
        }
      }); 
  });
}


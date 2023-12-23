({
	//Inicialização e assinatura do plataforma event
	//Na transferencia, ao aceitar o chat, temos um flow que identifica a alteração do owner do chat transcript e força o evento de plataforma ChatTransferMessage__e
	//Nele mandamos o id do chat transcript e o tipo 'Transcript Updated' e identificamos essa mudança no if do messageCallback
	//Quando ocorre este evento, chamamos a função do LWC forçando a propriedade do componente updateRecord = true
	doInit: function (cmp, evt, helper) {
		cmp.set('v.messageData', []);
		const replayId = -1;
		var channel = '/event/ChatTransferMessage__e'; //Pode ser um custom label para o caso de trocarmos o canal
		const empApi = cmp.find('empApi');

		const messageCallback = function (message) {
			var messageObject = message.data.payload;
			console.log('Message Received');
			console.log(JSON.stringify(messageObject));
			if (
				messageObject.Type__c == 'Transcript Updated' &&
				cmp.get('v.recordId').includes(messageObject.TranscriptID__c)
			) {
				cmp.set('v.eventType', 'Transcript Transfered');
				cmp.set('v.updateRecord', true);
			}
		};

		const errorHandler = function (message) {
			console.error('Received error ', JSON.stringify(message));
		};

		empApi
			.subscribe(channel, replayId, messageCallback)
			.then(function (newSubscription) {
				console.log('Subscribed to channel' + channel);
			});

		empApi.onError(errorHandler);
	},

	updateFinished: function (cmp, evt, helper) {
		console.log('Record updated successfully!');
		cmp.set('v.eventType', '');
		cmp.set('v.updateRecord', false);
	},

	//Evento de mensagem recebida do cliente e incremento do json
	onNewMessage: function (cmp, evt, helper) {
		//console.log(evt);

		var recordId = evt.getParam('recordId');
		var content = evt.getParam('content');
		var name = evt.getParam('name');
		var type = evt.getParam('type');
		var timestamp = evt.getParam('timestamp');
		var messageData = cmp.get('v.messageData');
		if (cmp.get('v.recordId').includes(recordId)) {
			messageData.push({
				type: type,
				recordId: recordId,
				content: content,
				name: name,
				timestamp: timestamp
			});
			cmp.set('v.messageData', messageData);
			console.log(JSON.stringify(messageData));
		}
	},

	//Identifica a ação do agente e e incremento do json
	onAgentSend: function (cmp, evt, helper) {
		//console.log('@@@' + evt);
		var messageData = cmp.get('v.messageData');
		var recordId = evt.getParam('recordId');
		var content = evt.getParam('content');
		var name = evt.getParam('name');
		var type = evt.getParam('type');
		var timestamp = evt.getParam('timestamp');
		if (cmp.get('v.recordId').includes(recordId)) {
			messageData.push({
				type: type,
				recordId: recordId,
				content: content,
				name: name,
				timestamp: timestamp
			});
			cmp.set('v.messageData', messageData);
			console.log(JSON.stringify(messageData));
			//cmp.set("v.updateRecord",true);
		}
	},

	//Evento do chat terminado, setamos a propriedade updateRecord = true para atualizar o campo TranscriptJSON__c do chattranscription com as mensagens trocadas
	onChatEnded: function (cmp, evt, helper) {
		console.log('Chat Ended');
		var messageData = cmp.get('v.messageData');
		console.log(JSON.stringify(messageData));
		var recordId = evt.getParam('recordId');

		//alert("recordId:" + recordId);
		console.log('Update Record');
		cmp.set('v.eventType', 'Chat Ended');
		cmp.set('v.updateRecord', true);

		const omniAPI = cmp.find('omniToolkit');
		omniAPI
			.getAgentWorks()
			.then(function (result) {
				const works = JSON.parse(result.works);
				for (const work of works) {
					if (work.workItemId === recordId) {
						omniAPI.closeAgentWork({ workId: work.workId });
					}
				}
			})
			.catch(function (error) {
				console.error(error);
			});
	}
});

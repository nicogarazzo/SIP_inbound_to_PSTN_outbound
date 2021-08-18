let call1, call2, data;

VoxEngine.addEventListener(AppEvents.CallAlerting, (e) => {
  e.call.answer(); // answer incoming call
  call2 = e.call;
  e.call.addEventListener(CallEvents.Connected, handleScenarioStart);
  e.call.addEventListener(CallEvents.Disconnected, () => VoxEngine.terminate());
}); 


const callerId = "19075196897"; // Rented or verified phone number
data = '573194703580';

function handleScenarioStart(e) {
  call2.say('Hola, te hablo desde Voximplant plataforma. Intentaré marcar a Nicolás ahora. Dame un momento... haciendo llamada PSTN', Language.US_SPANISH_FEMALE);
  
   // start scenario - calling number over SIP
 
  //call1 = VoxEngine.callSIP('scenario_23795@forward.nps-uctechdemo-c2.voximplant.com', { callerid:`${callerId}@kabushev.ru`, headers:{'X-clientLanguage': 'Spanish'}

  //call1 = VoxEngine.callSIP('sip:ilwtravel.my3cx.us', { callerid:`${callerId}@kabushev.ru`, headers:{'X-clientLanguage': 'Spanish'}, 
  //displayName: "Steve Rogers",
  //password: "1vCviYMl9R",
  //authUser: "100",
 //});

  call1 = VoxEngine.callPSTN(data, callerId);

  // assign event handlers
  //Cuando COntesta kit por SIP
  call1.addEventListener(CallEvents.Connected, handleCall2Connected);
  call1.addEventListener(CallEvents.Failed, function (e) {
    call2.say('Lo siento, llamada fallida', Language.US_SPANISH_FEMALE);

    VoxEngine.terminate();
    Logger.write('Llamada fallida - Sesión terminada');
  });
  call1.addEventListener(CallEvents.Disconnected, function (e) {
    VoxEngine.terminate();
  });
  
}



function handleCall2Connected(e) {
  // connect two calls with each other - media 
  VoxEngine.sendMediaBetween(call1, call2);
  // and signalling
  VoxEngine.easyProcess(call1, call2);
}
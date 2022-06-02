export const ScriptEvents = {
	Webview: {
		EmitToServer: "gui:emitToServer",
		EmitToGuiFromServer: "gui:emitToGui",
		RouteTo: "gui:webview:setRoute",
	},
	Client: {
		ConnectionComplete: "client:connectionComplete",
	},
	Auth: {
		Request: "gui:auth:requestAuth",
		SendUserDataToServer: "server:auth:sendUserDataToServer",
	},
};

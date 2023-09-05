({
	handleError: function (component, error) {
		var description = error.getParams().description;
		component.set('v.error', description);
		// TESTE DE PRODUÇAO
	}
});

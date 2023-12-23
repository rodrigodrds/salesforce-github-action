@IsTest
public with sharing class APIBrasilServiceObject_Test {
	static testMethod void testParse() {
		StaticResource sr = [
			SELECT id, body
			FROM StaticResource
			WHERE name = 'APIBrasilJSONExample'
			LIMIT 1
		];
		String json = sr.Body.toString();
		APIBrasilServiceObject obj = APIBrasilServiceObject.parse(json);
		System.assert(obj != null);
	}
}

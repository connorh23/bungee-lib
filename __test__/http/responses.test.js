const { responses } = require('../../http');

test('responses.success correctly formats output', () => {

	const test_status_code = 999;
	const test_headers = { header: 'val'};
	const test_body = { data: 'foo' };
	const test_compress_output = true;

	const params = {
		statusCode: test_status_code,
		headers: test_headers,
		body: test_body,
		compress_output: test_compress_output
	};

	const expected_output = {
		statusCode: test_status_code,
		headers: {
			... test_headers,
			'Accept-Encoding': 'gzip',
			'x-accept-encoding': 'gzip'
		},
		body: JSON.stringify(test_body, null, 3)
	};


	const response_output = responses.success(params);
	expect(response_output).toEqual(expected_output);
});

test('responses.success uses provided defaults', () => {

	const expected_output = {
		statusCode: 200,
		headers: {},
		body: JSON.stringify({}, null, 3)
	};

	const response_output = responses.success({});
	expect(response_output).toEqual(expected_output);
});

test('responses.success correctly formats output', () => {

	const test_status_code = 999;
	const test_headers = { header: 'val'};
	const test_errors = ['This is an error message'];
	const test_compress_output = true;

	const params = {
		statusCode: test_status_code,
		headers: test_headers,
		errors: test_errors,
		compress_output: test_compress_output
	};

	const expected_output = {
		statusCode: test_status_code,
		headers: {
			... test_headers,
			'Accept-Encoding': 'gzip',
			'x-accept-encoding': 'gzip'
		},
		body: JSON.stringify({errors:test_errors}, null, 3)
	};


	const response_output = responses.error(params);
	expect(response_output).toEqual(expected_output);
});

test('responses.error uses provided defaults', () => {

	const expected_output = {
		statusCode: 500,
		headers: {},
		body: JSON.stringify({errors:[]}, null, 3)
	};

	const response_output = responses.error({});
	expect(response_output).toEqual(expected_output);
});

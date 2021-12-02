exports.error_messages = {
    server_error: {status_code: 500, message: "Already exist."},
    not_exist: {status_code: 404, message: "Not found."},
    wrong_pass: {status_code: 400, message: "Incorrect Password"},
    login_page: {status_code: 404, message: "** Login/Signup page **"},
    un_authorized: {status_code: 401, message: "Only admins can see all user's data."},
    required: {status_code: 400, message: "Invalid input."}
}

exports.responses = {
    succeeded: {status_code: 201, message: 'Successfully Done.'}
}
const mail_regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

/// common.util.checkMailAddress(address)
/// Returns true if and only if address is a valid mail address.
///
/// **Parameters:**
/// - `address` a `String`.
///
/// **Return:**
/// - `Boolean`.
export function check_mail_address(address, re = mail_regex) {
	return re.test(address);
}

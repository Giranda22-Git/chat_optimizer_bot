function bad_request (ctx, post_message = "") {
  return ctx.reply("[400] -> Missing or invalid one or more parameters, " + post_message)
}

module.exports = bad_request


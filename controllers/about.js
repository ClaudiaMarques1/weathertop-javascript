"use strict";

const logger = require("../utils/logger");

const about = {// This ensures that when you press the About button, it will lead you to the about page.
  index(request, response) {
    logger.info("about rendering");
    const viewData = {
      title: "About"
    };
    response.render("about", viewData);
  }
};

module.exports = about;

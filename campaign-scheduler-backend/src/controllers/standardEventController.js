const { saveStandardEvent } = require("../services/standardEventService");

const REQUIRED_FIELDS = [
  "eventName",
  "action",
  "category",
  "createdDatetime",
  "projectName",
  "userId",
];

const trackStandardEvent = async (req, res) => {
  try {
    const payload = req.body;

    // Validate required fields
    const missing = REQUIRED_FIELDS.filter(
      (f) => payload[f] === undefined || payload[f] === null || payload[f] === ""
    );
    if (missing.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Missing required fields",
        missingFields: missing,
      });
    }

    // Normalize attributes — frontend sends as object {"0":{}, "1":{}} or array
    let attributes = [];
    if (Array.isArray(payload.attributes)) {
      attributes = payload.attributes;
    } else if (typeof payload.attributes === "object") {
      attributes = Object.values(payload.attributes);
    }

    // Build clean event object
    const event = {
      eventName:       payload.eventName,
      action:          payload.action,
      label:           payload.label || "",
      screen:          payload.screen || "",
      category:        payload.category,
      sessionStart:    payload.sessionStart || "",
      createdDatetime: payload.createdDatetime,
      projectName:     payload.projectName,
      userId:          Number(payload.userId),
      attributes,
    };

    // Service: flat file → Redis
    await saveStandardEvent(event);

    return res.status(200).json({
      success: true,
      message: "Event tracked successfully",
      eventName: event.eventName,
    });

  } catch (error) {
    console.error("[StandardEventController] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { trackStandardEvent };
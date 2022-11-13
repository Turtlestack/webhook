import {logger} from "firebase-functions";
import {https} from "firebase-functions/v2";

enum Strategy {
  UNKNOWN= "unknown",
  GITHUB = "github",
  CLI = "cli"
}

export const webhook = https.onRequest((req, resp) => {
  const strategy = getStrategy(req);
  logger.info("Hello logs!", {strategy});
  resp.json({status: 200, strategy});
});

/**
 * @param {https.Request} req https request handler
 * @return {Strategy} derived from request
 */
function getStrategy(req: https.Request): Strategy {
  switch (req.query.sp) {
    case "cli":
      return Strategy.CLI;
    case "github":
      return Strategy.GITHUB;
    default:
      return Strategy.UNKNOWN;
  }
}

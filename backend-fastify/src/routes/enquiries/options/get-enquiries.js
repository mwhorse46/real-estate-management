import { enquiryProperties } from "./schema.js";
import { responseSuccess, responseError } from '../../../utils/schema/response.js';

export const getEnquiriesOpts = (handler) => ({
  schema: {
    response: {
      200: responseSuccess({
        data: {
          type: "array",
          items: enquiryProperties,
        }
      }),
      400: responseError()
    },
  },
  handler,
});

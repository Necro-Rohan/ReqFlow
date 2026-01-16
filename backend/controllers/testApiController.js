import axios from "axios";
import history from "../models/history.js";
import { testApiSchema } from "../validators/testApiValidator.js";

export const testApi = async(req, res) => {
  const result = testApiSchema.safeParse(req.body);
  // console.log(result)
  if (!result.success) { 
    console.log(result)
    return res.status(400).json({ errors: result.error.issues.map(e => e.message) });
  }
  const { url, method, headers, body } = result.data;

  const startTime = Date.now();
  try {
    const response = await axios({
      url,
      method,
      headers,
      data: body || undefined,
      validateStatus: () => true 
    });
    const timeTaken = Date.now() - startTime; 

    const responseSize = JSON.stringify(response.data).length; 

    const newHistory = new history({
      userId: req.user.userId,
      method,
      url,
      headers,
      body: body || undefined,
      statusCode: response.status,
      response: {
        headers: response.headers,
        body: response.data,
        responseSize: responseSize
      },
      timeTaken
    });
    await newHistory.save();

    return res.status(200).json({
      status: response.status,
      headers: response.headers,
      body: response.data,
      timeTaken: timeTaken,
      responseSize: responseSize
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
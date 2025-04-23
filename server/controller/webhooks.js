import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to manage Clerk User With database

export const clerkWenhooks = async (req, res) => {
  try {
    const Webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // verifying  Headers
    await whook.verify(JSON.stingify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = req.body;
    // switch for different events

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.Json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.Json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.Json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.Json({ sucess: false, message: "Webhooks Error " });
  }
};

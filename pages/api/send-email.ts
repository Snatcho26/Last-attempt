import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import SibApiV3Sdk from "sib-api-v3-sdk";

// Supabase setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Brevo setup
const brevoClient = SibApiV3Sdk.ApiClient.instance;
brevoClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
const brevoApi = new SibApiV3Sdk.ContactsApi();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Missing email" });
    }

    // 1. Save email into Supabase waitlist table
    await supabase.from("waitlist").insert([{ email, name }]);

    // 2. Add email into Brevo Waitlist #5 (replace 123 with your listId)
    const contact = {
      email,
      attributes: { FIRSTNAME: name || "" },
      listIds: [123],
    };
    await brevoApi.createContact(contact);

    return res.status(200).json({ message: "Added to Brevo + Supabase successfully" });
  } catch (error: any) {
    console.error("Brevo error:", error);
    return res.status(500).json({ message: "Failed to process", error: error.message });
  }
}

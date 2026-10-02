// Automated notification hook. Add channels (email / WhatsApp API / SMS) here once
// credentials are configured. Never blocks or fails the booking.
export async function notifyBookingCreated(b: any) {
  try {
    // Example: if (Deno.env.get("WHATSAPP_API_TOKEN")) { ...send template message... }
    console.log("Booking created (notifications not configured):", b.ref_number);
  } catch (e) {
    console.error("Notification failed", e);
  }
}

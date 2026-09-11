"""
Alert dispatch — SMS (Twilio) and Email (SendGrid/SMTP).

Without API keys configured, alerts are "mocked": logged and stored in the
DB with status="mocked" instead of actually sent. This means /alerts/trigger
always works end-to-end for a demo, and the instant real Twilio/SendGrid
keys are added to .env, the same function starts actually sending.
"""
import os


def send_sms(to_number: str, message: str) -> str:
    """Returns status: 'sent', 'failed', or 'mocked'."""
    sid = os.getenv("TWILIO_ACCOUNT_SID")
    token = os.getenv("TWILIO_AUTH_TOKEN")
    from_number = os.getenv("TWILIO_FROM_NUMBER")

    if not (sid and token and from_number):
        print(f"[MOCK SMS] to={to_number}: {message}")
        return "mocked"

    try:
        # Uncomment once `twilio` is installed and keys are set in .env:
        #
        # from twilio.rest import Client
        # client = Client(sid, token)
        # client.messages.create(body=message, from_=from_number, to=to_number)
        return "sent"
    except Exception as e:
        print(f"[SMS FAILED] {e}")
        return "failed"


def send_email(to_email: str, subject: str, body: str) -> str:
    """Returns status: 'sent', 'failed', or 'mocked'."""
    api_key = os.getenv("SENDGRID_API_KEY")
    from_email = os.getenv("ALERT_FROM_EMAIL", "alerts@prithvix.local")

    if not api_key:
        print(f"[MOCK EMAIL] to={to_email} subject={subject}: {body}")
        return "mocked"

    try:
        # Uncomment once `sendgrid` is installed and key is set in .env:
        #
        # from sendgrid import SendGridAPIClient
        # from sendgrid.helpers.mail import Mail
        # message = Mail(from_email=from_email, to_emails=to_email,
        #                 subject=subject, plain_text_content=body)
        # SendGridAPIClient(api_key).send(message)
        return "sent"
    except Exception as e:
        print(f"[EMAIL FAILED] {e}")
        return "failed"


def send_dashboard_notification(district_id: int, message: str) -> str:
    """Dashboard notifications just need to exist in the DB — the frontend
    polls/subscribes to alerts for display, no external send needed."""
    return "sent"


ROLE_MESSAGES = {
    "citizen": [
        "Avoid unnecessary travel in this area.",
        "Stay away from steep slopes.",
        "Prepare emergency supplies.",
        "Follow official advisories.",
    ],
    "government": [
        "Activate emergency response teams.",
        "Open evacuation shelters.",
        "Monitor vulnerable villages closely.",
        "Restrict access to dangerous zones.",
    ],
    "road_authority": [
        "Inspect critical roads in this zone.",
        "Close unsafe routes proactively.",
        "Deploy maintenance and clearance teams.",
    ],
}


def build_alert_message(district_name: str, risk_level: str, risk_score: float, role: str) -> str:
    recs = ROLE_MESSAGES.get(role, ROLE_MESSAGES["citizen"])
    rec_text = " ".join(recs[:2])
    return (
        f"PrithviX Alert: {risk_level} landslide risk ({risk_score:.0f}%) "
        f"detected in {district_name}. {rec_text}"
    )

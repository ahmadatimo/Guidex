from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

MAIL_CONFIG = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=os.getenv("MAIL_STARTTLS") == "True",  # Use STARTTLS
    MAIL_SSL_TLS=os.getenv("MAIL_SSL_TLS") == "True",    # Use SSL/TLS
    USE_CREDENTIALS=os.getenv("USE_CREDENTIALS") == "True",
)

async def send_email(subject: str, recipients: list, body: str):
    """
    Send an email to the specified recipients.
    """
    message = MessageSchema(
        subject=subject,
        recipients=recipients,
        body=body,
        subtype="html",  # Use "plain" for plain text emails
    )

    fast_mail = FastMail(MAIL_CONFIG)
    await fast_mail.send_message(message)

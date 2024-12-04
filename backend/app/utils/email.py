from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import load_dotenv
import os

load_dotenv()

MAIL_CONFIG = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),  
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"), 
    MAIL_FROM=os.getenv("MAIL_FROM"),    
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),  
    MAIL_SERVER=os.getenv("MAIL_SERVER"),     
    MAIL_TLS=os.getenv("MAIL_TLS") == "True",  
    MAIL_SSL=os.getenv("MAIL_SSL") == "True", 
    USE_CREDENTIALS=True,
)

async def send_email(subject: str, recipients: list, body: str):
    """
    Send an email to the specified recipients.
    """
    message = MessageSchema(
        subject=subject,
        recipients=recipients,
        body=body,
        subtype="html",  # "plain" for plain text emails (if you want plain text)
    )

    fast_mail = FastMail(MAIL_CONFIG)
    await fast_mail.send_message(message)

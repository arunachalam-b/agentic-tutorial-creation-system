import edge_tts
import asyncio

sentences = [
    ("First, let's navigate to Google Forms to create our contact collection form.", "step_1.mp3"),
    ("Now, click on the Blank option to create a new form from scratch.", "step_2.mp3"),
    ("Let's give our form a title by entering 'Contact Information Collection'.", "step_3.mp3"),
    ("Now, let's add our first question to collect the user's name. We'll use a short answer field.", "step_4.mp3"),
    ("Next, let's add a question to collect the user's email address. We'll use a short answer field with email validation.", "step_5.mp3"),
    ("Now, let's add a question to collect the user's mobile number. We'll use a short answer field with number validation.", "step_6.mp3"),
    ("Great! Now let's publish our form. Click on the Share button to open sharing options.", "step_7.mp3"),
    ("Let's make the form accessible to anyone with the link. Set the sharing option to allow responses.", "step_8.mp3"),
    ("Perfect! Our form is now published and ready to collect responses.", "step_9.mp3"),
]

async def generate_audio(text, filename):
    communicate = edge_tts.Communicate(text, voice="en-US-JennyNeural")
    await communicate.save(filename)
    print(f"Audio saved to {filename}")

async def main():
    for text, filename in sentences:
        await generate_audio(text, filename)

asyncio.run(main())

import edge_tts
import asyncio

sentences = [
    ("First, let's navigate to Google Forms to create our contact collection form.", "step_1.mp3"),
    ("Now, click on the Blank option to create a new form from scratch.", "step_2.mp3"),
]

async def generate_audio(text, filename):
    communicate = edge_tts.Communicate(text, voice="en-US-JennyNeural")
    await communicate.save(filename)
    print(f"Audio saved to {filename}")

async def main():
    for text, filename in sentences:
        await generate_audio(text, filename)

asyncio.run(main())

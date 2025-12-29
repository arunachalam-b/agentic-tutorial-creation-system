import edge_tts
import asyncio

TEXT = "It doesn't matter who you are, what you are, if you put in the hard work, no one can stop you from achieving success"
AUDIO_FILE = "speech_edge.mp3"

async def main():
    communicate = edge_tts.Communicate(TEXT, voice="en-US-JennyNeural")
    await communicate.save(AUDIO_FILE)
    print(f"Audio saved to {AUDIO_FILE}")

asyncio.run(main())

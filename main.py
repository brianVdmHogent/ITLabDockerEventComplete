from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
app = FastAPI()

app.mount("/static", StaticFiles(directory="./web"), name="static")

@app.get("/")
async def index():
    return FileResponse('web/index.html')

@app.get("/game.js")
async def index():
    return FileResponse('web/game.js')


if __name__ == '__main__':

    uvicorn.run(app, host="0.0.0.0", port=8000)

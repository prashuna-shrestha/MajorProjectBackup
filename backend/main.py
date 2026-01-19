from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import analysis, stocks, auth, technical_status
from routers.predictions import router as lstm_predict
from routers.market_movers import router as market_movers_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analysis.router)
app.include_router(stocks.router)
app.include_router(auth.router)
app.include_router(technical_status.router, prefix="/api")
app.include_router(lstm_predict, prefix="/api")
app.include_router(market_movers_router, prefix="/api")

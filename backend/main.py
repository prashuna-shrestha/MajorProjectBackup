from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import analysis, stocks, categories

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
app.include_router(categories.router)

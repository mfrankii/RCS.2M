from fastapi import FastAPI
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from routes.user import user
from routes.consumer import consumer
from routes.auth import auth

app = FastAPI(
    title="RCS.2M"
)
app.add_middleware(HTTPSRedirectMiddleware)

app.include_router(user)
app.include_router(consumer)
app.include_router(auth)
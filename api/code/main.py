from fastapi import FastAPI
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from routes.user import user
from routes.plan import plan

app = FastAPI(
    title="RCS.2M"
)
app.add_middleware(HTTPSRedirectMiddleware)

app.include_router(user)
app.include_router(plan)

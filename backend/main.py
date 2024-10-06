from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# ------------------------------ LOCAL IMPORTS ------------------------------#
from backend.database import Admin, get_db, engine, Base
from backend.apis.admin.routes import admin_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # allow all origins, but change this to a specific domain when in production
    allow_methods=["*"],
    allow_headers=["*"],
)


# REGISTER ROUTERS
app.include_router(admin_router)


@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)
    db: Session = next(get_db())
    try:
        admin = Admin(username="admin", password="admin")
        db.add(admin)
        db.commit()
        print("Admin created successfully")
    except Exception as e:
        print(f"Error creating admin: {e}")
    finally:
        db.close()

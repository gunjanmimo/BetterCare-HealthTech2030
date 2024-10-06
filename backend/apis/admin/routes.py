from fastapi import FastAPI, Depends
from backend.apis.admin.schemas import AdminLoginPayload
from fastapi import APIRouter, HTTPException

# ------------------------------ LOCAL IMPORTS ------------------------------#
from backend.database import Admin, get_db

admin_router = APIRouter()


@admin_router.post("/api/admin/login")
async def admin_login(payload: AdminLoginPayload, db=Depends(get_db)):
    try:
        admin = db.query(Admin).filter(Admin.username == payload.username).first()
        if not admin:
            raise HTTPException(status_code=400, detail="Invalid username")
        if admin.password != payload.password:
            raise HTTPException(status_code=400, detail="Invalid password")

        return {
            "message": "Admin logged in successfully",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

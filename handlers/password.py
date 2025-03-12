#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
  Author: pirogue 
  Purpose: Password modification handler
  Site: http://pirogue.org 
"""

import tornado.web
import json
import hashlib
from handlers.base import BaseHandler
from dbs.initdb import DBSession
from dbs.models.Users import User
from util.auth import jwtauth

@jwtauth
class PasswordHandler(BaseHandler):
    def post(self):
        if not self.request.headers["Content-Type"].startswith("application/json"):
            self.set_status(400)
            self.write("Invalid content type")
            return

        try:
            data = json.loads(self.request.body.decode('utf-8'))
            current_password = data["current_password"]
            new_password = data["new_password"]
            user_id = self.current_user["id"]
        except:
            self.set_status(400)
            self.write("Missing required fields")
            return

        # Validate current password
        current_pwd_hash = hashlib.md5(current_password.encode('utf-8')).hexdigest()
        user = DBSession.query(User).filter(User.id == user_id).scalar()
        
        if not user or user.password != current_pwd_hash:
            self.set_status(401)
            self.write("Current password is incorrect")
            DBSession.close()
            return

        # Update password
        try:
            new_pwd_hash = hashlib.md5(new_password.encode('utf-8')).hexdigest()
            user.password = new_pwd_hash
            DBSession.commit()
            self.write({"result": True, "message": "Password updated successfully"})
        except:
            DBSession.rollback()
            self.set_status(500)
            self.write("Failed to update password")
        finally:
            DBSession.close()
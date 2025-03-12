#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""  
  Author: pirogue 
  Purpose: 邮件配置增删改
  Site: http://pirogue.org 
  Created: 2018-08-08 15:20:49
"""

from util.auth import jwtauth
from handlers.base import BaseHandler
import json
from service.emailconfigservice import get_email_config, save_email_config

@jwtauth
class EmailModifyHandler(BaseHandler):
    def write_error(self, status_code, **kwargs):
        self.write("Unable to parse JSON.")

    def post(self):
        if self.request.headers["Content-Type"].startswith("application/json"):
            try:
                json_args = json.loads(self.request.body.decode('utf-8'))
                config_data = {
                    'mail_host': json_args.get('mail_host'),
                    'mail_user': json_args.get('mail_user'),
                    'mail_pass': json_args.get('mail_pass'),
                    'mail_postfix': json_args.get('mail_postfix'),
                    'recipients': json_args.get('recipients')
                }
                
                if save_email_config(config_data):
                    self.write({"status": "success", "message": "邮箱配置已更新"})
                else:
                    self.set_status(500)
                    self.write({"status": "error", "message": "保存邮箱配置失败"})
            except Exception as e:
                self.set_status(400)
                self.write({"status": "error", "message": str(e)})
        else:
            self.set_status(400)
            self.write({"status": "error", "message": "Invalid Content-Type"})

    def get(self):
        config = get_email_config()
        if config:
            self.write(config)
        else:
            self.set_status(404)
            self.write({"status": "error", "message": "未找到邮箱配置"})


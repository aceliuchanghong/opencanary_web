#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
  Author: pirogue 
  Purpose: 邮箱配置模型
  Site: http://pirogue.org 
"""

from sqlalchemy import Column, String, Integer
from dbs.initdb import Base

class EmailConfig(Base):
    __tablename__ = 'email_config'

    id = Column(Integer, primary_key=True, autoincrement=True)
    mail_host = Column(String(128), nullable=False, comment='SMTP服务器地址')
    mail_user = Column(String(128), nullable=False, comment='邮箱用户名')
    mail_pass = Column(String(128), nullable=False, comment='邮箱密码')
    mail_postfix = Column(String(64), nullable=False, comment='邮箱后缀')
    recipients = Column(String(512), nullable=False, comment='收件人列表，多个用分号分隔')

    def to_dict(self):
        return {
            'id': self.id,
            'mail_host': self.mail_host,
            'mail_user': self.mail_user,
            'mail_pass': self.mail_pass,
            'mail_postfix': self.mail_postfix,
            'recipients': self.recipients
        }
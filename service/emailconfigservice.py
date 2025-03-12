#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
  Author: pirogue 
  Purpose: 邮箱配置服务
  Site: http://pirogue.org 
"""

from dbs.initdb import DBSession
from dbs.models.EmailConfig import EmailConfig

def get_email_config():
    """获取邮箱配置"""
    session = DBSession
    try:
        config = session.query(EmailConfig).first()
        return config.to_dict() if config else None
    except Exception as e:
        print(f"获取邮箱配置失败: {str(e)}")
        return None
    finally:
        session.close()

def save_email_config(config_data):
    """保存邮箱配置"""
    session = DBSession
    try:
        config = session.query(EmailConfig).first()
        if not config:
            config = EmailConfig()
        
        config.mail_host = config_data['mail_host']
        config.mail_user = config_data['mail_user']
        config.mail_pass = config_data['mail_pass']
        config.mail_postfix = config_data['mail_postfix']
        config.recipients = config_data['recipients']
        
        if not config.id:
            session.add(config)
        session.commit()
        return True
    except Exception as e:
        session.rollback()
        print(f"保存邮箱配置失败: {str(e)}")
        return False
    finally:
        session.close()
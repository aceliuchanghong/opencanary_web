#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
  Author: Lch 
  Purpose: 数据库配置文件
  Created: 2018-02-01 15:04:29
  Changed: 2025-03-13 18:42:29
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# 数据库配置
DB_HOST = "127.0.0.1"
DB_USER = "root"
DB_PWD = "huanchengzijidemima"
DB_NAME = "honeypot"


# # 创建对象基类
# Base = declarative_base()
# （推荐使用 DeclarativeBase）
class Base(DeclarativeBase):
    pass


# 初始化数据库连接
engine = create_engine(
    f"mysql+pymysql://{DB_USER}:{DB_PWD}@{DB_HOST}/{DB_NAME}?charset=utf8",
    echo=True,  # 调试时开启，生产环境建议设为 False
    pool_size=100,
    pool_pre_ping=True,
    pool_recycle=3600,
)

# 创建 Session 类型
Session = sessionmaker(bind=engine)
DBSession = Session()
